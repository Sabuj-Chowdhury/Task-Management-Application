# Task Management Application

A simple and efficient **Task Management Application** where users can **add, edit, delete, and reorder tasks** using a **drag-and-drop interface**. Tasks are categorized into three sections:

- **To-Do** 📌
- **In Progress** ⏳
- **Done** ✅

All changes are **instantly saved to the database**, ensuring persistence across sessions.

## 🚀 Live Demo

🔗 **[Task Management App](https://task-management-applicat-23df9.web.app/)**

## 📂 Repository

To clone the project, run the following command:

```sh
git clone https://github.com/Sabuj-Chowdhury/Task-Management-Application.git
cd Task-Management-Application/client
```

## ⚡ Installation & Setup

Follow these steps to set up the project locally:

1. **Navigate to the client directory:**

   ```sh
   cd client
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env.local` file in the root of the client folder** and add the required environment variables (found in Firebase configuration). Ensure the following keys exist in the file:

   ```env
   VITE_API_KEY=your_api_key_here
   VITE_AUTH_DOMAIN=your_auth_domain_here
   VITE_PROJECT_ID=your_project_id_here
   VITE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_APP_ID=your_app_id_here
   VITE_URL=your_backend_url_here
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

## 🛠️ Technologies Used

- **Frontend:** React 19, Vite.js, Tailwind CSS
- **State Management:** TanStack React Query
- **Drag & Drop:** @hello-pangea/dnd, DnD Kit
- **Backend:** Express.js (Hosted on Vercel)
- **Database:** MongoDB
- **Authentication:** Firebase Auth
- **UI Components:** React Icons, HeroIcons, React Hot Toast

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

---

💡 **Developed by [Sabuj Chowdhury](https://github.com/Sabuj-Chowdhury)**
