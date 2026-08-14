# GitHub Profile Analyzer API

A Node.js and Express.js backend service that analyzes a public GitHub profile using the GitHub REST API and stores useful insights in MySQL.

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios

## Features

- Fetch public GitHub profile data by username
- Store analyzed profile information in MySQL
- Re-analyzing the same username updates the existing record
- Calculate total repository stars and forks
- Identify top programming languages
- Fetch all stored analyzed profiles
- Fetch a single stored profile
- Includes Postman collection for testing

## Project Structure

```text
github-profile-analyzer/
├── src/
│   ├── config/db.js
│   ├── controllers/profileController.js
│   ├── models/profileModel.js
│   ├── routes/profileRoutes.js
│   ├── services/githubService.js
│   ├── app.js
│   └── server.js
├── database/schema.sql
├── postman/github-profile-analyzer.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create MySQL database

Run:

```sql
SOURCE database/schema.sql;
```

Or open `database/schema.sql` in MySQL Workbench and execute it.

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_analyzer
```

### 4. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

### Analyze GitHub Profile

```http
GET /api/analyze/:username
```

Example:

```http
GET /api/analyze/octocat
```

This fetches the public GitHub profile and repositories, calculates useful insights, and stores the result in MySQL.

### Get All Analyzed Profiles

```http
GET /api/profiles
```

### Get Single Analyzed Profile

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

### Health Check

```http
GET /
```

## Database Insights

The application stores:

- GitHub username
- Name
- Bio
- Profile URL
- Avatar URL
- Public repository count
- Followers
- Following
- Public gists
- Account creation date
- GitHub updated date
- Total stars across fetched repositories
- Total forks across fetched repositories
- Top programming languages
- Analysis timestamp

## Error Handling

- `400` - Invalid username
- `404` - GitHub user/profile not found
- `429` - GitHub API rate limit
- `500` - Server/database error

## Postman

Import:

`postman/github-profile-analyzer.postman_collection.json`

Set `baseUrl` to the deployed API URL when testing the live deployment.

## Notes

The GitHub public API can be used without authentication for basic public data. GitHub API rate limits still apply.
