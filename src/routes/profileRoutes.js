const express = require("express");
const {
  analyzeProfile,
  getProfiles,
  getProfile
} = require("../controllers/profileController");

const router = express.Router();

router.get("/analyze/:username", analyzeProfile);
router.get("/profiles", getProfiles);
router.get("/profiles/:username", getProfile);

module.exports = router;
