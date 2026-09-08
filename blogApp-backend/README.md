# Blog Application REST API 🚀

Blog Application REST API is a **Node.js + Express + Sequelize** REST API for a blog management application with three access levels: **Guest, User, and Admin**.

The API provides authentication, password recovery, user management, blog CRUD operations, role-based authorization, validation, profile image upload, account activation/deactivation, and public blog search and filtering.

---

## 🎯 Purpose

The API is designed to demonstrate a complete role-based blog management system with:

* User registration and JWT-based authentication
* Forgot-password / reset-password flow
* Secure password hashing with bcryptjs
* Role-based access control for Guest, User, and Admin
* User profile, password, and profile-image management
* Admin user management and account activation/deactivation
* Blog creation, reading, updating, and deletion
* Blog ownership-based authorization
* Public blog search and category filtering
* Centralized error handling and input validation
* MySQL database persistence using Sequelize

---

## 🔗 API Under Test

* **Base URL:** `http://localhost:5000`
* **API Base Path:** `/api`

### 📚 API Documentation

A complete written API reference is available in:

`docs/API.md`

The Postman collection is available in the repository:

`postman/Blog-API.postman_collection.json`

To generate a public Postman documentation URL:

**Postman → Open Collection → View documentation → Publish**

Doc View Link: https://documenter.getpostman.com/view/54614618/2sBYAvwBHE

---

## ✅ What Gets Tested

1. Register a new user through the public registration endpoint
2. Log in with valid credentials and receive a JWT
3. Use the JWT to access protected user and blog endpoints
4. Request a password reset and complete it with the reset token
5. Allow users to view and update their own profile, including their avatar
6. Allow users to create and manage their own blogs
7. Prevent users from modifying another user's blogs
8. Allow admins to manage users and all blogs
9. Activate or deactivate user accounts through admin controls
10. Prevent deactivated users from logging in
11. Search public blogs by partial title
12. Filter public blogs by category
13. Combine title search and category filtering

---

## ✨ Features

* **JWT Authentication** — Secure token-based authentication with 1-day token expiration
* **Password Recovery** — Forgot-password and token-based reset-password endpoints
* **Role-Based Authorization** — Separate permissions for Guest, User, and Admin
* **Secure Password Storage** — Passwords are hashed using bcryptjs
* **Blog Ownership Protection** — Users can only update or delete their own blogs
* **Profile Image Upload** — Multer-backed avatar upload, validated by type and size
* **Admin Privileges** — Admins can manage users and any blog
* **Account Status Management** — Admins can activate or deactivate user accounts
* **Public Blog Search** — Search blogs using partial title matching
* **Category Filtering** — Filter blogs by category
* **Combined Filtering** — Search by title and category simultaneously
* **Centralized Error Handling** — Consistent API error responses
* **Environment-Based Configuration** — Database credentials and JWT secret are kept outside the repository
* **Postman Collection** — Ready-to-use API requests and environment configuration

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* Sequelize
* MySQL
* mysql2
* JSON Web Token (`jsonwebtoken`)
* bcryptjs
* multer
* ES Modules

---

## 📦 NPM Packages Used

* `express`
* `sequelize`
* `mysql2`
* `jsonwebtoken`
* `bcryptjs`
* `multer`
* `cors`
* `dotenv`

Dev dependency: `nodemon`

---

## 📁 Project Structure

```text
.
├── app.js                            # Express app, CORS, JSON parser, static /uploads, and route mounting
├── server.js                         # Database connection, sync, and server startup
│
├── config/
│   └── db.js                         # Sequelize database configuration
│
├── models/
│   ├── user.model.js                 # User model
│   ├── blog.model.js                 # Blog model
│   └── index.js                      # Model registration + associations
│
├── controller/
│   ├── auth.controller.js            # Register, login, forgot/reset password
│   ├── user.controller.js            # Profile, password, image upload, admin user management
│   └── blogs.controller.js           # Blog CRUD handlers
│
├── services/
│   ├── auth.service.js               # Authentication + password-reset business logic
│   ├── user.service.js               # User business rules
│   └── blog.service.js               # Blog business rules
│
├── middlewares/
│   ├── auth.middleware.js            # JWT verification (verify_token) and admin check (is_admin)
│   ├── error.middleware.js           # Centralized error handling
│   └── upload.middleware.js          # Multer config for profile-image uploads
│
├── routes/
│   ├── auth.route.js                 # /api/auth routes
│   ├── user.route.js                 # /api/users routes
│   └── blogs.route.js                # /api/blogs routes
│
├── scripts/
│   └── seed-admin.js                 # Create or update the default admin account
│
├── docs/
│   └── API.md                        # Detailed API reference
│
├── postman/
│   └── Blog-API.postman_collection.json
│
├── uploads/
│   └── profile-images/               # Uploaded avatars, served statically from /uploads
│
├── .env.example                      # Environment variable template
├── .gitignore
└── package.json
```

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/tash-9/Blog-Management-Application-with-Next.js.git
cd Blog-Management-Application-with-Next.js/blogApp-backend
```

### 2. Create the MySQL database

Make sure MySQL is installed and running, then create the database:

```sql
CREATE DATABASE blogdb;
```

### 3. Configure environment variables

Copy the environment template:

```bash
cp .env.example .env
```

Configure your MySQL credentials and a strong random `SECRET_KEY`.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=blogdb
DB_USER=root
DB_PASSWORD=your_password

SECRET_KEY=your_long_random_secret_key

# set to false once the tables are settled, to stop Sequelize altering them on boot
DB_SYNC=true

# the frontend's origin, allowed to call this API (CORS)
FRONTEND_URL=http://localhost:3000
```

### 4. Install dependencies

```bash
npm install
```

### 5. Create the admin account

```bash
npm run seed:admin
```

The seed script creates or updates an active admin account:

| Field    | Value               |
| -------- | ------------------- |
| Email    | `admin@example.com` |
| Password | `password123`       |
| Role     | `admin`             |
| Status   | Active              |

> For a real deployment, change the default admin password immediately and use a strong secret.

### 6. Start the development server

```bash
npm run dev
```

The API will be available at:

`http://localhost:5000`

---

## ▶️ Scripts

```bash
npm install             # Install dependencies
npm run seed:admin      # Create/update the admin account
npm run dev              # Start the development server (nodemon)
npm start                # Start the production server
```

---

## 🔐 Authentication

Protected endpoints require a valid JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

### Login Flow

1. Register using:

```http
POST /api/auth/register
```

2. Login using:

```http
POST /api/auth/login
```

3. Copy the returned JWT.

4. Include the token when accessing protected endpoints:

```http
Authorization: Bearer <token>
```

Tokens expire after **1 day**.

Deactivated users cannot log in, and existing tokens stop working once the associated account is deactivated.

### Forgot / Reset Password

1. Request a reset:

```http
POST /api/auth/forgot-password
```

2. Complete the reset with the token issued above:

```http
PATCH /api/auth/reset-password/:token
```

---

## 👥 Access Levels

The API supports three access levels:

| Role      | Description                                   |
| --------- | --------------------------------------------- |
| **Guest** | Can register, log in, and access public blogs |
| **User**  | Can manage their own profile and blogs        |
| **Admin** | Can manage users and all blogs                |

---

## 📌 API Endpoints

| #  | Method | Endpoint                        | Access     | Purpose                         |
| -- | ------ | -------------------------------- | ---------- | -------------------------------- |
| 1  | POST   | `/api/auth/register`             | Public     | Register a new user              |
| 2  | POST   | `/api/auth/login`                | Public     | Login and receive a JWT          |
| 3  | POST   | `/api/auth/forgot-password`      | Public     | Request a password reset token   |
| 4  | PATCH  | `/api/auth/reset-password/:token`| Public     | Reset password using the token   |
| 5  | GET    | `/api/users`                     | Admin      | Get all users                    |
| 6  | GET    | `/api/users/:id`                 | Admin      | Get a specific user              |
| 7  | PATCH  | `/api/users/:id/status`          | Admin      | Activate/deactivate a user       |
| 8  | GET    | `/api/users/profile`             | User/Admin | Get own profile                  |
| 9  | PUT    | `/api/users/profile/update`      | User/Admin | Update own profile               |
| 10 | PATCH  | `/api/users/profile/image`       | User/Admin | Upload/update own profile image  |
| 11 | PATCH  | `/api/users/password`            | User/Admin | Update own password              |
| 12 | POST   | `/api/blogs/create`              | User/Admin | Create a blog                    |
| 13 | GET    | `/api/blogs`                     | Public     | List/search/filter blogs         |
| 14 | GET    | `/api/blogs/:id`                 | Public     | Get a specific blog              |
| 15 | PUT    | `/api/blogs/update/:id`          | User/Admin | Update a blog                    |
| 16 | DELETE | `/api/blogs/delete/:id`          | User/Admin | Delete a blog                    |
| 17 | DELETE | `/api/blogs/:id`                 | User/Admin | Alternative delete route         |

---

## 🔎 Blog Search & Filtering

The blog listing endpoint is publicly accessible.

### Get all blogs

```http
GET /api/blogs
```

### Search by title

```http
GET /api/blogs?title=playwright
```

The title search supports **partial matching**.

### Filter by category

```http
GET /api/blogs?category=Testing
```

### Search and filter together

```http
GET /api/blogs?title=playwright&category=Testing
```

Guests do not need authentication to use any of these endpoints.

---

## 🖼️ Profile Image Upload

`PATCH /api/users/profile/image` accepts a single `multipart/form-data` field named `image`.

* Allowed types: JPG, PNG, WEBP, GIF
* Max size: 5 MB
* Files are stored on disk under `uploads/profile-images/` and served back from `/uploads/profile-images/<filename>`

---

## 🔒 Authorization Matrix

| Action                     | Guest | User | Admin |
| -------------------------- | :---: | :--: | :---: |
| Register / Login           |   ✅   |   ✅  |   ✅   |
| Forgot / reset password    |   ✅   |   ✅  |   ✅   |
| View blogs                 |   ✅   |   ✅  |   ✅   |
| Search / Filter blogs      |   ✅   |   ✅  |   ✅   |
| Create blog                |   ❌   |   ✅  |   ✅   |
| Update own blog            |   ❌   |   ✅  |   ✅   |
| Delete own blog            |   ❌   |   ✅  |   ✅   |
| Update another user's blog |   ❌   |   ❌  |   ✅   |
| Delete another user's blog |   ❌   |   ❌  |   ✅   |
| View own profile           |   ❌   |   ✅  |   ✅   |
| Update own profile         |   ❌   |   ✅  |   ✅   |
| Upload own profile image   |   ❌   |   ✅  |   ✅   |
| Change own password        |   ❌   |   ✅  |   ✅   |
| List users                 |   ❌   |   ❌  |   ✅   |
| Get specific user          |   ❌   |   ❌  |   ✅   |
| Activate/deactivate user   |   ❌   |   ❌  |   ✅   |

---

## 📊 HTTP Status Codes

| Code  | Meaning                                  |
| ----- | ---------------------------------------- |
| `200` | Successful read, update, or delete       |
| `201` | Successful registration or blog creation |
| `400` | Invalid input                            |
| `401` | Missing/invalid token or bad credentials |
| `403` | Authenticated but not authorized         |
| `404` | User, blog, or route not found           |
| `409` | Duplicate email                          |
| `500` | Unexpected server error                  |

### Example Forbidden Response

```json
{
  "message": "You are not authorized to update this blog."
}
```

---

## 🛡️ Security

The API includes several security and authorization controls:

* Passwords are hashed with **bcryptjs** before being stored.
* Password hashes are never returned through API responses.
* JWTs are required for protected endpoints.
* Blog `userId` is taken from the authenticated JWT rather than the request body.
* Users cannot register themselves as `admin`.
* Registration cannot set `role` or `isActive`.
* Profile updates cannot modify `role`, `isActive`, `password`, or `id`.
* Users cannot modify or delete blogs owned by another user.
* Profile image uploads are restricted by file type and size, and the filename is derived from the authenticated user's id, never from client input.
* Admin authorization is required for user-management operations.
* Deactivated users cannot authenticate.
* Existing authentication tokens become invalid when the associated account is deactivated.
* Sensitive configuration values are stored in `.env`.

---

## 📮 Postman Collection

The project includes a complete Postman collection for testing the API.

### Import the collection

```text
postman/Blog-API.postman_collection.json
```

### Import the environment

```text
postman/Blog-API.postman_environment.json
```

The default environment contains only:

```text
baseUrl = http://localhost:5000
```

Do not put `userId`, `blogId`, or tokens in the environment. Those are written as collection variables during the run. Stale IDs (for example `userId = 1`) make most tests 401/403.

Before you run:

1. Re-import `postman/Blog-API.postman_collection.json` (replace the old copy).
2. Import or update `postman/Blog-API.postman_environment.json`.
3. Start the API (`npm run dev`) and seed the admin (`npm run seed:admin`).
4. In Postman, select **Blog API Local**, then **Run collection** from the top of the collection (all folders, in order). Do not run a single folder in isolation.

The Postman requests automatically store important values such as:

* JWT token
* User IDs
* Blog IDs

This makes it possible to execute the API workflow without manually copying IDs between requests.

---

## 🧪 Suggested API Test Flow

A typical end-to-end API test flow is:

```text
Register User
     ↓
Login
     ↓
Receive JWT
     ↓
View Profile
     ↓
Update Profile / Upload Avatar
     ↓
Create Blog
     ↓
View Blog
     ↓
Update Own Blog
     ↓
Attempt Unauthorized Update
     ↓
Delete Own Blog
     ↓
Admin Login
     ↓
Manage Users
     ↓
Activate / Deactivate User
```

This flow can be executed through the included Postman collection.

---

## 📝 Notes

* The API runs on port `5000` by default.
* MySQL must be running before starting the server.
* The database name used by default is `blogdb`.
* `npm run seed:admin` creates or updates the admin account.
* The default development admin credentials should not be used in production.
* `.env` and `node_modules` are excluded through `.gitignore`.
* Uploaded avatars are written to `uploads/profile-images/` and served statically — this folder should be excluded from version control in production and backed up or moved to object storage instead.
* The detailed request/response documentation is available in `docs/API.md`.
* The Postman collection can be used for manual API verification and regression testing.

---

## ✍️ Author

Tasfia Islam Raisha

GitHub: `https://github.com/tash-9`