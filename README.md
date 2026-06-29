# ECHOSELF

> **Your music, visualized.**

ECHOSELF is a Spotify analytics dashboard inspired by Spotify Wrapped. It transforms your listening history into beautiful visualizations, interactive cards, and personalized insights, helping you discover your music identity in a clean and engaging way.

---

## ✨ Features

* Spotify OAuth Authentication
* User Profile
* Top Artists
* Top Tracks
* Playlist Overview
* Recently Played
* Listening Statistics
* Genre Analysis
* Interactive Dashboard
* Responsive UI

---

## 📊 Dashboard

* Profile Overview
* Top Artists
* Top Tracks
* Playlist Analytics
* Listening Insights
* Genre Distribution
* Personalized Summary

---

## 🛠 Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router
* Framer Motion

### Backend

* Node.js
* Express.js
* Axios

### APIs

* Spotify Web API
* Spotify OAuth 2.0

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server directory.

```env
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://127.0.0.1:4000/auth/callback
PORT=4000
```

### Start the application

Backend

```bash
npm start
```

Frontend

```bash
npm run dev
```

---

## 📂 Project Structure

```text
client/
│
├── components/
├── pages/
├── assets/
└── App.jsx

server/
│
├── routes/
├── controllers/
├── utils/
└── index.js
```

---

## 📸 Preview

Coming Soon.

---

## 📄 License

MIT License
