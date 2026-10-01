# 🚀 PlacePilot — AI Placement ERP

### 🎓 One Platform. Smarter Campus Placements.

A modern college placement management project built to bring student access, authentication, and placement dashboard experiences into one place.

<p align="center">
  <img src="https://img.shields.io/badge/Project-PlacePilot-6366F1?style=for-the-badge" alt="PlacePilot"/>
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React and Vite"/>
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js and Express"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
</p>

---

## ✨ About the Project

**PlacePilot** is a work-in-progress placement ERP project designed around the needs of college placement activities. It combines a React-based frontend with an Express backend, MongoDB persistence, and authentication for administrator and student accounts.

The goal is to develop a central platform where placement-related workflows can be organized and extended over time.

## 🌟 Current Features

| Feature              | Description                        |
| -------------------- | ---------------------------------- |
| 🔐 Authentication    | Student registration and login     |
| 🛡️ Admin Access     | Administrator login                |
| 🔑 JWT               | Token-based authentication         |
| 🔒 Password Security | Password hashing with bcrypt       |
| 🗄️ Database         | MongoDB integration using Mongoose |
| 🎓 Student Portal    | Initial student-facing portal      |
| 📊 Dashboard UI      | Placement dashboard interface      |
| 🧭 Project Structure | Separate frontend and backend      |

> **Project status:** Authentication and initial dashboard interfaces are implemented. The complete placement-management workflow and production-grade authorization remain under development.

## 🛠️ Tech Stack

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/CSS-663399?style=flat-square&logo=css&logoColor=white" alt="CSS"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

## 📁 Project Structure

```text
ai-placement-erp/
├── ai-model/
├── backend/
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── authroutes.js
│   ├── createAdmin.js
│   ├── server.js
│   ├── package.json
│   └── .env                 # Local only — never commit
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── Auth.jsx
│   │   └── main.jsx
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

* [Node.js](https://nodejs.org/)
* npm (included with Node.js)
* A MongoDB database, such as MongoDB Atlas

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd "ai placement erp"
```

Replace `YOUR_REPOSITORY_URL` with your GitHub repository URL.

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend` folder and add your own configuration:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_NAME=Your Admin Name
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_strong_admin_password
```

**Important:** These are placeholders, not working credentials. Never publish your real `.env` file, MongoDB connection string, passwords, or JWT secret.

### 3. Start the Backend

Check the scripts in `backend/package.json`. If a `start` script is configured, run:

```bash
npm start
```

Otherwise, use the command configured for your backend, for example:

```bash
node server.js
```

The backend is configured to use port `5000`.

### 4. Start the Frontend

Open a **second terminal** from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 🔐 Security Considerations

* Keep `.env` files out of Git.
* Never publish database credentials or admin passwords.
* Use a strong, randomly generated JWT secret.
* Protect sensitive backend operations with server-side authentication and role checks before production deployment.

## 🗺️ Roadmap

* [ ] Complete student and administrator authorization
* [ ] Connect placement drives to persistent database records
* [ ] Add company and placement-drive management
* [ ] Build student eligibility and application workflows
* [ ] Add interview and offer tracking
* [ ] Improve responsive layouts and accessibility
* [ ] Add automated tests and deployment documentation

## 🎯 Project Vision

PlacePilot aims to evolve into a unified college placement platform that connects student information, placement opportunities, and recruitment workflows in one organized system.

## 👩‍💻 Built With

Made with ❤️ using React, Node.js, Express, and MongoDB.

---

<p align="center">
  <strong>PlacePilot — Building a more organized placement experience.</strong>
</p>
