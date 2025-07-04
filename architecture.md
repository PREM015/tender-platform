# 🏗️ Architecture Overview: B2B Tender Management Platform

## 📦 Tech Stack

* **Frontend**: Next.js (TypeScript)
* **Backend**: Express.js (JavaScript)
* **Database**: PostgreSQL (via Knex.js)
* **Storage**: Supabase Buckets
* **Auth**: JWT-based authentication

---

## 🌐 Frontend (Next.js)

* Uses **app directory** and **client/server components**
* Organized in `/src/app/` with subfolders:

  * `signup`, `login`: Auth Pages
  * `dashboard`: User dashboard after login
  * `company`: Create/view company profile
  * `tenders`: Create/list/view tenders
  * `applications`: View applied tenders
  * `search`: Search companies or tenders
* **Client-side form validation** with HTML5 and basic `useState`
* **Image upload** via Supabase Storage

---

## 🚀 Backend (Express.js)

* Structure:

  * `/routes`: authRoutes.js, companyRoutes.js, tenderRoutes.js, applicationRoutes.js, searchRoutes.js
  * `/controllers`: Logic handlers for each route
  * `/models`: Database query logic using Knex
  * `/config`: db.js (Knex instance)
  * `/middlewares`: `authMiddleware.js` for JWT protection
* Uses **Joi** for input validation (optional)
* **Proper HTTP codes** and error handling

### 🔐 Auth Flow:

1. User signs up/logs in → JWT returned
2. JWT stored in `localStorage` (client)
3. Protected API routes check JWT via `authMiddleware`

---

## 🧠 PostgreSQL DB Schema

Using Knex Migrations:

* `users`: id, email, password
* `companies`: id, user\_id (FK), name, industry, description, logo\_url
* `tenders`: id, company\_id (FK), title, description, deadline, budget
* `applications`: id, tender\_id (FK), user\_id (FK), message, expected\_budget, resume\_url

---

## 🗃️ Supabase Storage

* Bucket: `logos`
* Used to store uploaded company logos or documents
* Public URLs fetched using `getPublicUrl()`
* Upload via `supabase.storage.from("logos").upload(...)`

---

## 🔍 Search API

* **Route**: `/api/search/companies?q=design`
* Searches across `company_name`, `industry`, `description`
* Case-insensitive search using `whereILike()`

---

## 🧩 Client/Server Communication

* Client fetches backend via `fetch("http://localhost:5000/api/...", { headers })`
* JWT token sent via `Authorization: Bearer` header
* Supabase is only used on frontend directly for file upload

---

## 🛠️ Deployment Plan

* Frontend → Vercel
* Backend → Render or Railway
* PostgreSQL → Supabase DB
* Storage → Supabase Bucket

---

## ✅ Summary

This architecture supports modular, scalable, and secure development of a B2B tender management platform with modern tooling and developer-friendly stack.
