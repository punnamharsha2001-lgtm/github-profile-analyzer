const express = require("express");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GitHub Profile Analyzer API is running"
  });
});

app.use("/api", profileRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;
