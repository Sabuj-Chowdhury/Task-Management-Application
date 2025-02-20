# Task Management Application

## 🌟 Overview

The **Task Management Application** is a full-stack web application that allows users to efficiently manage their tasks. Users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections:

- **To-Do** 📝
- **In Progress** 🚀
- **Done** ✅

All changes are instantly saved to the database to ensure persistence across sessions.

## 🔗 Live Demo

👉 [Task Management App](https://task-management-applicat-23df9.web.app/)

## 📂 Project Structure

The project is divided into two main parts:

1. **Frontend** (React + Vite.js) – `client` folder
2. **Backend** (Express + MongoDB) – `server` folder

---

# 🚀 Frontend

## 🛠️ Technologies Used

- React.js (Vite.js)
- Firebase Authentication
- React Router DOM
- React Query (TanStack Query)
- Tailwind CSS
- Axios
- React DnD (Drag-and-Drop)

## 📦 Dependencies

```json
"dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@hello-pangea/dnd": "^18.0.1",
    "@heroicons/react": "^2.2.0",
    "@tailwindcss/vite": "^4.0.7",
    "@tanstack/react-query": "^5.66.7",
    "axios": "^1.7.9",
    "firebase": "^11.3.1",
    "prop-types": "^15.8.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-router": "^7.2.0",
    "react-router-dom": "^7.2.0",
    "tailwindcss": "^4.0.7"
}
```

## ⚡ Installation & Setup

```sh
# Clone the repository
git clone https://github.com/Sabuj-Chowdhury/Task-Management-Application

# Navigate to the frontend directory
cd client

# Install dependencies
npm install

# Create a .env.local file in the root of the client folder and add necessary environment variables

# Start the development server
npm run dev
```

---

# 🖥️ Backend

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Atlas)
- dotenv
- CORS

## 📦 Dependencies

```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.13.0"
}
```

## ⚡ Installation & Setup

```sh
# Navigate to the backend directory
cd server

# Install dependencies
npm install

# Create a .env file in the root of the server folder and add necessary environment variables

# Start the server
node index.js
```

## 🔗 Backend API URL

👉 [Task Management Backend](https://todo-seven-weld-93.vercel.app)

## 📌 API Endpoints

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| POST   | `/users`     | Save user data         |
| POST   | `/tasks`     | Add a new task         |
| GET    | `/tasks`     | Retrieve all tasks     |
| GET    | `/tasks/:id` | Get task details by ID |
| PUT    | `/tasks/:id` | Update a task          |
| DELETE | `/tasks/:id` | Delete a task          |

---

# 📌 Features

✅ **User Authentication (Firebase Auth)**
✅ **Task Categorization (To-Do, In Progress, Done)**
✅ **Drag-and-Drop Task Management**
✅ **Real-Time Updates with React Query**
✅ **Responsive Design (Desktop & Mobile)**
✅ **MongoDB Database for Data Persistence**
✅ **Secure API with Express.js**
