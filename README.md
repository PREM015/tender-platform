# 🏗️ Tender Management Platform

A full-stack B2B tender-management platform where companies can:

* Register & manage their profile (including logo upload)
* Create & publish tenders
* Apply to tenders
* Search companies

---

## 🧑‍💻 Tech Stack

### Frontend

* Next.js (App Router, TypeScript ready)
* Tailwind CSS
* Supabase Storage (for logo upload)
* Client-side form validation

### Backend

* Express.js (modular routing)
* JWT-based Auth
* PostgreSQL (via Knex.js)
* Supabase Storage SDK

### DevOps

* Deployment: Vercel (Frontend), Render/Heroku (Backend)
* Migrations: Knex CLI

---

## 📁 Folder Structure

```
📦tender-platform
├── frontend/         # Next.js client
└── backend/          # Express API server
```

### Frontend Pages

```
src/app/
├── login
├── signup
├── dashboard
├── tenders/new
├── tenders/[id]/apply
├── search/companies
├── company
├── applications
└── profile
```

### Backend Routes

```
backend/routes/
├── authRoutes.js
├── companyRoutes.js
├── tenderRoutes.js
├── applicationRoutes.js
└── searchRoutes.js
```

---

## ⚙️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourname/tender-platform
cd tender-platform
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npx knex migrate:latest
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```



## 📸 Screenshots

* ✅ Signup/Login
* 🏢 Company Profile
* 📦 Tender Creation
* 📝 Application Form
* 🔍 Company Search

---

## 🧠 Features Covered

* [x] JWT Auth (signup/login)
* [x] Company profile with image upload
* [x] Tender CRUD
* [x] Apply to tender
* [x] Company search API
* [x] Supabase bucket integration

---

## 📽️ Loom Demo

> [Link to Loom Video](https://loom.com/your-demo)

---

## 📬 Contact

Made with ❤️ 
