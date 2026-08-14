const pool = require("../config/db");

async function upsertProfile(profile) {
  const sql = `
    INSERT INTO github_profiles
    (username, name, bio, profile_url, avatar_url, public_repos, followers,
     following, public_gists, account_created_at, github_updated_at,
     total_stars, total_forks, top_languages, analyzed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      bio = VALUES(bio),
      profile_url = VALUES(profile_url),
      avatar_url = VALUES(avatar_url),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      public_gists = VALUES(public_gists),
      account_created_at = VALUES(account_created_at),
      github_updated_at = VALUES(github_updated_at),
      total_stars = VALUES(total_stars),
      total_forks = VALUES(total_forks),
      top_languages = VALUES(top_languages),
      analyzed_at = NOW()
  `;

  await pool.execute(sql, [
    profile.username,
    profile.name,
    profile.bio,
    profile.profile_url,
    profile.avatar_url,
    profile.public_repos,
    profile.followers,
    profile.following,
    profile.public_gists,
    profile.account_created_at,
    profile.github_updated_at,
    profile.total_stars,
    profile.total_forks,
    profile.top_languages
  ]);

  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles WHERE username = ?",
    [profile.username]
  );

  return rows[0];
}

async function getAllProfiles() {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles ORDER BY analyzed_at DESC"
  );
  return rows;
}

async function getProfileByUsername(username) {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles WHERE username = ?",
    [username]
  );
  return rows[0];
}

module.exports = {
  upsertProfile,
  getAllProfiles,
  getProfileByUsername
};
