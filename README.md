# blogApp — Blog Management Application

blogApp is a full-stack blog management platform with three access levels — **Guest, User, and Admin** — built as a **Next.js** frontend backed by a **Node.js/Express + MySQL** REST API.

Guests can browse, search, and read every blog with no login required. Registered users can write and manage their own posts and profile. Admins can manage users and moderate all content.

---

## 🎯 Purpose

This repository was built for a **Frontend + Backend Development** assignment. The two halves are independent projects that communicate purely over the REST API — the frontend holds no database code, and the backend has no knowledge of the UI.

---

## 🧩 Repository Structure

| Folder | Description | Docs |
|---|---|---|
| [`blogApp-frontend/`](./blogApp-frontend) | Next.js 14 + Tailwind CSS client | [Frontend README](./blogApp-frontend/README.md) |
| [`blogApp-backend/`](./blogApp-backend) | Node.js + Express + Sequelize (MySQL) REST API | [Backend README](./blogApp-backend/README.md) |

Each project has its own dependencies, environment variables, and run scripts — see the linked READMEs for full setup details.

---

## ✨ Key Features

- Public blog discovery: browse, search by title, and filter by category — no account needed
- Read individual blog posts with full author information
- Register / login / logout, forgot-password, and reset-password flows
- Persistent token-based authentication with protected dashboard routes
- Create, edit, and delete your own blog posts
- Profile editing with instant avatar upload
- Role-based admin menu: activate/deactivate users, manage any blog
- Loading, error, empty, and confirmation states throughout the UI

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, lucide-react
**Backend:** Node.js, Express, Sequelize, MySQL, JWT, bcryptjs, multer

---

## 🚀 Quick Start (run both projects locally)

**1. Start the backend API first** — the frontend has nothing to show without it:

```bash
cd blogApp-backend
npm install
cp .env.example .env      # set DB credentials + SECRET_KEY
npm run seed:admin        # creates a default admin account
npm run dev               # runs at http://localhost:5000
```

**2. Then start the frontend:**

```bash
cd blogApp-frontend
npm install
cp .env.example .env      # set NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev               # runs at http://localhost:3000
```

Open **http://localhost:3000** in your browser.

---

## 🔗 Application Routes (frontend)

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Browse, search, and filter blogs |
| `/blogs/[id]` | Public | Read a blog post |
| `/login`, `/register` | Public | Authentication |
| `/forgot-password`, `/reset-password/[token]` | Public | Password recovery |
| `/dashboard` | User / Admin | Account dashboard |
| `/dashboard/blogs` | User / Admin | Manage blogs |
| `/dashboard/blogs/create` | User / Admin | Publish a blog |
| `/dashboard/blogs/[id]/edit` | User / Admin | Edit a blog |
| `/dashboard/profile` | User / Admin | Update profile and avatar |
| `/dashboard/change-password` | User / Admin | Change password |
| `/admin/users` | Admin | Activate or deactivate users |

---

## 📌 API Reference

Full endpoint documentation and a ready-to-import Postman collection live in the backend project:

- [`blogApp-backend/docs/API.md`](./blogApp-backend/docs/API.md)
- [`blogApp-backend/postman/Blog-API.postman_collection.json`](./blogApp-backend/postman/Blog-API.postman_collection.json)

---

## ✍️ Author

Tasfia Islam Raisha
