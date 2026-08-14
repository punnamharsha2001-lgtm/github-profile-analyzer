const { analyzeGithubUser } = require("../services/githubService");
const {
  upsertProfile,
  getAllProfiles,
  getProfileByUsername
} = require("../models/profileModel");

async function analyzeProfile(req, res) {
  const { username } = req.params;

  try {
    if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Invalid GitHub username"
      });
    }

    const profile = await analyzeGithubUser(username);
    const savedProfile = await upsertProfile(profile);

    return res.status(200).json({
      success: true,
      message: "GitHub profile analyzed and stored successfully",
      data: savedProfile
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found"
      });
    }

    if (error.response?.status === 403) {
      return res.status(429).json({
        success: false,
        message: "GitHub API rate limit exceeded. Please try again later."
      });
    }

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze GitHub profile"
    });
  }
}

async function getProfiles(req, res) {
  try {
    const profiles = await getAllProfiles();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analyzed profiles"
    });
  }
}

async function getProfile(req, res) {
  try {
    const profile = await getProfileByUsername(req.params.username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Analyzed profile not found in database"
      });
    }

    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
}

module.exports = {
  analyzeProfile,
  getProfiles,
  getProfile
};
