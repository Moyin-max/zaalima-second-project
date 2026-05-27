# Extensio.ai

Extensio.ai is a full-stack Chrome extension generator built with a React/Vite frontend and an Express/MongoDB backend.

## Live Demo

- Frontend: https://extensio-ai-six.vercel.app
- Backend: https://extensio-api.onrender.com

## Project Overview

Extensio.ai helps a user describe a Chrome extension idea in plain language and then turns that request into downloadable extension files. The platform includes authentication, project saving, zip packaging, and a dashboard for managing generated extension work.

## Core Features

- User signup and login
- Saved extension projects per user
- Prompt-based extension generation flow
- Automatic zip packaging and download
- Dashboard for viewing generated projects
- Demo fallback mode when live AI generation is unavailable

## Stack

- Frontend: React, Vite, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Packaging: Archiver

## Demo Flow

1. Create an account or log in
2. Open the generator page
3. Enter an extension request
4. Generate the extension files
5. Download the zip package
6. View the saved project on the dashboard

## Example Use Case

Example prompt:

```text
Build a Chrome extension that blocks all images on a website and replaces them with a red square.
```

The app then prepares a Chrome extension structure such as:

- `manifest.json`
- `content.js`
- `popup.html`
- optional styling and supporting files

## Local Setup

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 3. Create environment files

Frontend:

- Copy `.env.example` to `.env`
- Set `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Backend:

- Copy `server/.env.example` to `server/.env`
- Set:
  - `MONGODB_URI`
  - `XAI_API_KEY`
  - `JWT_SECRET`
  - `FRONTEND_URL` for the deployed frontend origin

See [server/README.md](C:/Users/MOYIN/Downloads/zaalima-second-project-main/zaalima-second-project-main/server/README.md) for backend setup details.

## Run Locally

Start the backend:

```bash
cd server
npm start
```

Start the frontend in a second terminal:

```bash
npm run dev
```

## Build

Frontend production build:

```bash
npm run build
```

## Deployment Notes

- Do not commit `.env` or `server/.env`
- Use `.env.example` and `server/.env.example` as safe templates
- Frontend hosting can use `VITE_API_BASE_URL` pointing to your deployed backend
- Backend hosting should set `MONGODB_URI`, `XAI_API_KEY`, `JWT_SECRET`, and `FRONTEND_URL` in the host dashboard

## Current Status

- Frontend and backend are deployed
- Authentication and project storage are working
- Zip packaging and download flow are working
- Demo fallback mode is available when the AI provider is unavailable
