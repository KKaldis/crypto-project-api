# 🧠 Crypto Project Intelligence API

A **work-in-progress** backend API designed to support deep analysis of crypto projects. It aggregates data from multiple sources—such as GitHub, Telegram, Discord, and others—to provide insights into a project's activity, transparency, and credibility.

## 🧩 About the Project

This backend is **meant to be used alongside a browser-based crawler extension**.  
As users browse various crypto-related websites, the extension will send project entries (like URLs, tags, or metadata) to this API. These entries will then be analyzed through various modules.

A dedicated logic layer for **data structuring, deduplication, enrichment, and persistent storage** is planned, but **not yet implemented**.

---

## 🔧 Tech Stack

- **Node.js + Express** – REST API server
- **TypeScript** – Strongly typed codebase
- **MongoDB** – Project and metadata storage
- **Swagger UI** – Interactive API documentation
- **dotenv** – Environment variable management

---

## ✅ Features (Work in Progress)

- [x] Express API Setup
- [x] MongoDB Connection & Schema Base
- [x] GitHub Endpoint Integration
- [x] Telegram Metrics Endpoint
- [x] Discord Community Stats
- [ ] Smart Contract Analysis
- [ ] Website & Domain Availability Checking
- [ ] Social Media Growth Tracking (e.g. Twitter, Reddit)
- [ ] Reputation & Risk Scoring Engine
- [ ] Extension Data Intake & Processing Logic
- [ ] CORS Configuration for Production
- [ ] CI/CD Pipeline & Deployment Setup

---

## 📂 API Structure Overview

| Route         | Description                                |
| ------------- | ------------------------------------------ |
| `/github`     | GitHub repo info, commits, stars, etc.     |
| `/telegram`   | Telegram stats and channel activity         |
| `/discord`    | Discord server insights and growth          |
| `/other`      | Misc tools like domain checks (planned)     |
| `/api-docs`   | Swagger UI for API exploration              |
| `/status`     | Returns current API version and mode        |

---

## 🚀 Getting Started


### 1. Clone the repository
```bash
git clone https://github.com/KKaldis/crypto-project-api.git
cd crypto-project-api
```

### 2. Install dependencies
```bash
npm install
```
### 3. Setup your environment file
```bash
cp .env.example .env
```

### 4. Start the development server
```bash
npm run dev
```

The server will start on http://localhost:<PORT> (based on your .env settings).


## 📘 .env Example
```env
PORT='3666'
TELEGRAM_CHANNEL=''
GITHUB_OCTOKIT_TOKEN=''
GITHUB_BASE_URL='https://api.github.com'
TELEGRAM_BASE_URL='https://api.telegram.org'
TELEGRAM_TOKEN=''
MONGO_BASE_URL=''
MONGO_BASE_NAME=''
VERSION=''
NODE_ENV='DEVELOPMENT'
DISCORD_API_BASE_URL="https://discord.com/api/v9/"
DISCORD_TOKEN="YOUR_BOT_TOKEN"
```

## 📘 API Documentation
Once the server is running, explore the interactive API docs at:
http://localhost:<PORT>/api-docs
This provides a live interface to test and understand available routes and responses.

## 🚧 Disclaimer
This project is under active development. Many components are still being built, including the browser extension, data logic layer, and advanced analytics modules.

We are working on modularizing this further for better maintainability and expansion into other blockchains and social platforms.

## 🙌 Contributions
We welcome PRs, suggestions, and feature requests!

If you’re interested in adding new endpoints, improving architecture, or building the extension-to-backend communication protocol—feel free to open an issue or contribute directly.
