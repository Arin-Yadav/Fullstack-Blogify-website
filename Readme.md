# 📝 Blogify

A full-stack blogging platform where users can securely sign up, log in, and manage their personal blog posts. Built with React, Node.js, Express, and MongoDB, Blogify showcases clean authentication, protected routes, and real-time CRUD operations—all wrapped in a user-friendly interface.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure login and signup with token-based access
- 🛡️ **Protected Routes** – Dashboard access only for authenticated users
- 📝 **Create Blogs** – Add new blog posts with title and content
- ✏️ **Edit Blogs** – Update existing posts via a sleek modal interface
- 🗑️ **Delete Blogs** – Remove posts instantly with real-time UI updates
- 📦 **Modular Codebase** – Clean separation of frontend and backend logic

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database  |
|----------------|-----------------|-----------|
| React + Vite   | Node.js + Express | MongoDB Atlas |
| Tailwind CSS   | JWT Auth        | Mongoose  |
| Axios          | REST API        |           |

---

## 📁 Folder Structure

```
client/
  └── src/
      ├── components/       # BlogForm, EditBlogModal, Navbar
      ├── pages/            # Dashboard, Login, Signup
      ├── App.jsx           # Route setup
      └── main.jsx          # Entry point

server/
  ├── controllers/          # blogController.js, authController.js
  ├── models/               # Blog.js, User.js
  ├── routes/               # blogRoutes.js, authRoutes.js
  └── server.js             # Express app setup
```

---

## 🧪 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/blogify.git
cd blogify
```

### 2. Set up the backend

```bash
cd server
npm install
touch .env
```

Add your environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
touch .env
```

Add your API URL:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

## 📸 Screenshots

> _Add screenshots of your dashboard, blog form, and modal here once styling is done._

---

## 🌐 Live Demo

> _Add your deployed link here once hosted on Vercel/Netlify + Render/Railway._

---

## 🙌 Credits

Built by [Arin](https://github.com/your-username) as a full-stack showcase project.
