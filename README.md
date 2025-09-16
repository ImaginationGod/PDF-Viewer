# 📑 PDF Annotator (MERN)

A collaborative PDF annotation app built with the MERN stack (MongoDB, Express, React, Node.js).
It lets you upload PDFs, view them, highlight text, and manage your personal library.

## 🌐 Live Demo

Try the app online: [FinanceTracker Live](https://financetracker-svwv.onrender.com)  

---

## 🚀 Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS v3.4.17 + React Router + React-PDF
- **Backend:** Node.js + Express (ES Modules)
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (JSON Web Tokens)
- **Deployment Ready:** Serves frontend from backend in production

---

## 📦 Project Structure
```
pdf-annotator/
├── backend/              # Express + MongoDB backend
│   ├── src/
│   │   ├── models/       # Mongoose models (User, Pdf, Highlight)
│   │   ├── routes/       # Express routes
│   │   ├── controllers/  # Route controllers
│   │   └── server.js     # Entry point
│   └── package.json
├── frontend/             # React (Vite + Tailwind) frontend
│   └── package.json
├── package.json          # Root scripts (build/start)
└── README.md

```
---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/your-username/pdf-annotator.git
cd pdf-annotator
```
### 2️⃣ Environment Variables
In backend/.env:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

In frontend/.env:
```bash
VITE_API_URL=http://localhost:5000/api # (for development)
# VITE_API_URL=http:/api (for production)
```

### 3️⃣ Install Dependencies
```bash
# Install backend + frontend deps
npm run install --prefix backend
npm run install --prefix frontend
```

### 4️⃣ Run Locally (Development)
```bash
In two terminals:

# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev
```
Frontend will be on http://localhost:5173, backend on http://localhost:5000.

### 5️⃣ Production Build
```bash
# At root
npm run build
npm start

This will:
- Builds frontend (frontend/dist)
- Serves frontend from backend (/)
- API available at /api/...
```
---
### 🌐 Deployment (Render)

Push repo to GitHub

Create a Web Service on Render

Connect repo

Set:

Build Command: npm run build

Start Command: npm start

Add environment variable MONGO_URI

Deploy 🚀

---

### 📖 API Endpoints

Base URL:
Local → http://localhost:5000/api
Production → https://your-app.onrender.com/api

### 🔑 Auth

- **POST** /api/auth/register → Register user

- **POST** /api/auth/login → Login & get JWT

### 📂 PDFs

- **GET** /api/pdfs → Get all user PDFs

- **POST** /api/pdfs/upload → Upload a PDF (multipart form-data)

### 🖍️ Highlights

- **POST** /api/highlights → Add highlight

- **GET** /api/highlights/:pdfId → Get highlights for PDF

- **DELETE** /api/highlights/:id → Delete highlight

---

### 🖥️ Frontend Routes

```/login``` → Login

```/register``` → Register

```/dashboard``` → View uploaded PDFs + Upload new

```/viewer/:pdfId``` → View PDF, add highlights

```/:id/delete``` → Delete transaction

---
