const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "github-profile-analyzer"
  },
  timeout: 10000
});

async function getGithubProfile(username) {
  const response = await githubApi.get(`/users/${encodeURIComponent(username)}`);
  return response.data;
}

async function getGithubRepositories(username) {
  const response = await githubApi.get(
    `/users/${encodeURIComponent(username)}/repos`,
    {
      params: {
        per_page: 100,
        sort: "updated",
        direction: "desc"
      }
    }
  );
  return response.data;
}

async function analyzeGithubUser(username) {
  const profile = await getGithubProfile(username);
  const repositories = await getGithubRepositories(username);

  const languageCounts = {};

  for (const repo of repositories) {
    if (repo.language) {
      languageCounts[repo.language] =
        (languageCounts[repo.language] || 0) + 1;
    }
  }

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language, count]) => ({ language, repositoryCount: count }));

  const totalStars = repositories.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );

  const totalForks = repositories.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0
  );

  return {
    username: profile.login,
    name: profile.name,
    bio: profile.bio,
    profile_url: profile.html_url,
    avatar_url: profile.avatar_url,
    public_repos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    public_gists: profile.public_gists,
    account_created_at: profile.created_at,
    github_updated_at: profile.updated_at,
    total_stars: totalStars,
    total_forks: totalForks,
    top_languages: JSON.stringify(topLanguages)
  };
}

module.exports = { analyzeGithubUser };
