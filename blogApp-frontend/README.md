# blogApp — Blog Management Application

blogApp is a Next.js + Tailwind CSS frontend for a REST API-based blog platform. It supports guest blog discovery, authenticated blog management, profile management, password recovery, and admin user controls.

## 🎯 Purpose

This project was created for the **Frontend Development** assignment. It consumes the provided Blog REST API; no blog data, users, or authentication results are hardcoded in the frontend.

---

## ✨ Features

- Browse, search, and filter blogs by category (29 categories covered — Technology, Programming, AI & Machine Learning, Business, Health, Travel, Lifestyle, and more)
- Read individual blog posts with author information
- Register, login, logout, forgot-password, and reset-password flows
- Persistent token-based authentication and protected dashboard routes
- Create, update, and delete blogs
- Profile editing and profile-image upload with live preview
- Change password
- Role-based admin menu and user activation/deactivation controls
- Loading, error, empty, and confirmation states throughout
- Fully responsive public pages, dashboard, and sidebar

---

## 🛠️ Technologies Used

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- lucide-react (icons)
- REST API with Bearer token authentication

## 📦 NPM Packages Used

- next
- react
- react-dom
- lucide-react
- tailwindcss
- postcss
- autoprefixer

---

## 🎨 Design System

| Purpose         | Color     | Tailwind token |
| ---------------- | --------- | -------------- |
| Primary          | `#2563EB` | `primary` / `blue-600` |
| Primary hover    | `#1D4ED8` | `primary-hover` / `blue-700` |
| Dark text        | `#16213E` | `ink` |
| Body text        | `#334155` | `slate-700` |
| Secondary text   | `#64748B` | `slate-500` |
| Page background  | `#F8FAFC` | `slate-50` |
| Card background  | `#FFFFFF` | `white` |
| Border           | `#E2E8F0` | `slate-200` |
| Success          | `#16A34A` | `success` / `green-600` |
| Error            | `#DC2626` | `error` / `red-600` |
| Warning          | `#D97706` | `warning` / `amber-600` |

---

## 📁 Project Structure

```
app/
├── page.jsx                          # Public blog list, search, and category filter
├── login/page.jsx
├── register/page.jsx
├── forgot-password/page.jsx
├── reset-password/[token]/page.jsx
├── blogs/[id]/page.jsx               # Blog details
├── dashboard/
│   ├── layout.jsx                    # Protected dashboard layout
│   ├── page.jsx
│   ├── blogs/
│   │   ├── page.jsx
│   │   ├── create/page.jsx
│   │   └── [id]/edit/page.jsx
│   ├── profile/page.jsx
│   └── change-password/page.jsx
└── admin/users/page.jsx
components/
├── Navbar.jsx
├── Sidebar.jsx
├── ProfileMenu.jsx
├── AuthShell.jsx                     # Shared split-panel layout for auth pages
├── BlogCard.jsx
├── BlogForm.jsx
├── SearchBar.jsx
├── CategoryFilter.jsx
├── Loader.jsx
├── EmptyState.jsx
└── ConfirmDialog.jsx
services/
├── auth.service.js
├── user.service.js
└── blog.service.js
contexts/
└── AuthContext.jsx
utils/
├── api.js
├── auth.js
└── constants.js                      # Brand name + shared category list
```

---

## ⚙️ Local Installation

1. Clone the repository:

```bash
git clone https://github.com/tash-9/Blog-Management-Application-with-Next.js.git
cd Blog-Management-Application-with-Next.js
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from the template:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Blog REST API base URL, for example `http://localhost:5000/api` |

The Blog REST API must be running (separately) before using this application — see [Backend Dependency](#-backend-dependency) below.

---

## ▶️ Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Run the production server
```

---

## 🔗 Application Routes

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

## 👤 User and Admin Functionality

**Users** can manage their profile, profile image, password, and their own blog posts. The backend remains responsible for ownership authorization.

**Admins** receive an additional Users menu and can activate/deactivate user accounts. They can manage any blog when permitted by the backend API.

---

## 🔌 Backend Dependency

This frontend is a pure client for the Blog REST API — it holds no database
connection code and stores no data of its own. All blogs, users, and
authentication are handled entirely by the backend at the URL set in
`NEXT_PUBLIC_API_URL`.

The [Blog Application REST API](https://github.com/username/Blog-Application-REST-API-Development) (Node/Express + MySQL) is a separate project, built and
submitted independently. It must be running and reachable at that URL before
this frontend will show any real data.

---

### 📸 
Screenshots to be added

---

## ✍️ Author
Tasfia Islam Raisha
