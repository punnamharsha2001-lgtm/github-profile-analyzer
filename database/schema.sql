CREATE DATABASE IF NOT EXISTS github_analyzer;

USE github_analyzer;

CREATE TABLE IF NOT EXISTS github_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255),
  bio TEXT,
  profile_url VARCHAR(500),
  avatar_url VARCHAR(500),
  public_repos INT DEFAULT 0,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  public_gists INT DEFAULT 0,
  account_created_at DATETIME NULL,
  github_updated_at DATETIME NULL,
  total_stars INT DEFAULT 0,
  total_forks INT DEFAULT 0,
  top_languages JSON,
  analyzed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
