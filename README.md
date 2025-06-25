# 🚀 DevConnect – Developer Social Network

DevConnect is a full-stack social networking app for developers. It allows users to sign in via Google OAuth, edit their profile, explore other devs, and follow/unfollow them — like a LinkedIn for developers, built from scratch to showcase full-stack skills.

## 🌐 Live Demo

> Coming Soon...


---

## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- Context API for auth state
- Tailwind CSS

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Passport.js](https://www.passportjs.org/) with Google OAuth 2.0
- [MongoDB + Mongoose](https://mongoosejs.com/)

### DevOps
- Docker (planned)
- Environment variables via `.env`

---

## 🔐 Features

- ✅ Google OAuth 2.0 login
- ✅ View/edit your developer profile (bio, skills, avatar)
- ✅ Explore and follow/unfollow other developers
- ✅ Persistent session authentication using cookies
- 🚧 Posts/projects and messaging (coming soon)

---

## 📁 Project Structure

devConnect/
│
├── devConnect-frontend/ # Frontend (React + Vite)
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # Reusable components (optional)
│ │ ├── context/ # AuthContext (AuthProvider)
│ │ ├── pages/ # Profile, Explore, Login pages
│ │ ├── App.jsx # Main app entry
│ │ └── main.jsx # Renders App into the DOM
│ ├── .env.example # Example env vars (VITE_API_URL)
│ ├── index.html # Base HTML template
│ └── vite.config.js # Vite dev/proxy config
│
├── devconnet-backend/ # Backend (Express + MongoDB)
│ ├── config/ # Passport strategy config
│ ├── models/ # Mongoose models (User)
│ ├── routes/ # API routes (auth, user)
│ ├── .env.example # Example env vars
│ └── index.js # Entry point of the Express server
│
└── README.md # Project documentation
