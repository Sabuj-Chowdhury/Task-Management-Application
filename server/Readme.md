# Task Management Backend

## 📌 Short Description

The **Task Management Backend** is a RESTful API built with Express.js and MongoDB to manage tasks efficiently. This backend allows users to create, read, update, and delete tasks, ensuring data persistence with MongoDB. It serves as the server-side component for the Task Management Application.

## 🌐 Live API URL

🔗 **Backend Hosted at:** [Task Management API](https://todo-seven-weld-93.vercel.app)

## 📂 Features

- User Registration & Authentication
- Create, Read, Update, and Delete (CRUD) operations for tasks
- Task categorization
- Database persistence using MongoDB
- RESTful API design
- Hosted on Vercel

---

## ⚙️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Backend framework
- **MongoDB** - NoSQL Database
- **dotenv** - Environment variable management
- **cors** - Middleware for Cross-Origin Resource Sharing

---

## 🚀 Installation & Setup

Follow these steps to set up the backend locally:

### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/Sabuj-Chowdhury/Task-Management-Application
```

### 2️⃣ Navigate to Backend Folder

```sh
cd server
```

### 3️⃣ Install Dependencies

```sh
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the root of the `backend` directory and add the following variables:

```sh
DB_USER=<your_mongodb_user>
DB_PASS=<your_mongodb_password>
```

_(Replace `<your_mongodb_user>` and `<your_mongodb_password>` with your credentials.)_

### 5️⃣ Run the Server

```sh
npm start
```

By default, the backend runs on **http://localhost:5000**

---

## 📦 Dependencies

```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.13.0"
}
```

---

## 📢 API Endpoints

### 🚀 User Routes

#### 1️⃣ Register a User

- **Endpoint:** `POST /users`
- **Description:** Registers a new user in the database.

### ✅ Task Routes

#### 2️⃣ Add a Task

- **Endpoint:** `POST /tasks`
- **Description:** Saves a new task to the database.

#### 3️⃣ Fetch All Tasks

- **Endpoint:** `GET /tasks`
- **Description:** Retrieves all tasks from the database.

#### 4️⃣ Fetch Task by ID

- **Endpoint:** `GET /tasks/:id`
- **Description:** Retrieves a specific task by its ID.

#### 5️⃣ Update a Task

- **Endpoint:** `PUT /tasks/:id`
- **Description:** Updates task details.

#### 6️⃣ Delete a Task

- **Endpoint:** `DELETE /tasks/:id`
- **Description:** Deletes a task by ID.

---
