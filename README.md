# Spotify Clone Backend

A Node.js and Express backend for a Spotify-inspired music application. It provides user registration and login, role-based artist access, music uploads through ImageKit, and album creation backed by MongoDB.

> This repository contains the backend API only; it does not include a frontend or audio playback interface.

## Features

- Register, log in, and log out users.
- Hash account passwords with bcrypt.
- Issue JWTs in an HTTP cookie for authentication.
- Restrict music and album creation to artist accounts.
- Upload music files to ImageKit.
- Store users, music metadata, and albums in MongoDB.

## Tech stack

- Node.js and Express
- MongoDB and Mongoose
- JSON Web Tokens (`jsonwebtoken`) and `bcryptjs`
- Multer for multipart file uploads
- ImageKit for music file storage

## Getting started

### Requirements

- Node.js and npm
- A MongoDB connection string
- An ImageKit private API key

### Setup

1. Clone the repository and open the project directory:

   ```bash
   cd 06-SpotifyClone-Project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your own credentials:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   JWT_SECRET=replace-with-a-long-random-secret
   IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
   ```

   Keep `.env` private and never commit credentials. The `.gitignore` file excludes `.env` files.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Or start it without Nodemon:

   ```bash
   npm start
   ```

The API listens on port `8000`.

## API endpoints

All endpoints are relative to `http://localhost:8000`.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user. Accepts `username`, `email`, `password`, and optional `role` (`user` or `artist`). |
| `POST` | `/api/auth/login` | Log in with `username` or `email` and `password`. |
| `POST` | `/api/auth/logout` | Clear the login cookie. |

Successful registration and login set a `token` cookie.

### Artist endpoints

These endpoints require an authenticated artist. Send the `token` cookie received during registration or login.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/music/upload` | Upload music as `multipart/form-data`. Include a `title` field and a music file in the `music` field. |
| `POST` | `/api/music/album` | Create an album with a JSON body containing `title` and `musics` (an array of music document IDs). |

Example album request body:

```json
{
  "title": "My Album",
  "musics": ["<music-id>"]
}
```

## Project structure

```text
.
├── server.js
└── src/
    ├── app.js
    ├── controller/       # Authentication and music request handlers
    ├── db/               # MongoDB connection
    ├── middlewares/       # Artist authentication
    ├── models/            # User, music, and album schemas
    ├── routes/            # Authentication and music API routes
    └── services/          # ImageKit file storage
```
