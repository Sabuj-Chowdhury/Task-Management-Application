import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import TaskCards from "../TaskCardByCategory/TaskCards";
import { useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router";

const Home = () => {
  const { logOut, user } = useContext(AuthContext);
  // console.log(user.email);
  const navigate = useNavigate();
  const onLogout = async () => {
    await logOut();
    navigate("/");
  };
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    email: user?.email || "",
  });

  const [error, setError] = useState("");
  const queryClient = useQueryClient(); // React Query Cache

  const addTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!newTask.title.trim()) {
      setError("Title is required!");
      return;
    }
    if (newTask.title.length > 50 || newTask.description.length > 200) {
      setError("Title or description too long!");
      return;
    }

    const taskData = { ...newTask, email: user?.email };
    console.log("New Task Data:", taskData);

    try {
      await axios.post(`${import.meta.env.VITE_URL}/tasks`, taskData);
      toast.success("Added Successfully!");
      setNewTask({
        title: "",
        description: "",
        category: "To-Do",
        email: user?.email,
      });

      queryClient.invalidateQueries(["tasks"]); // Refetch tasks after adding
    } catch (err) {
      console.log(err);
      toast.error("Failed!");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-400 via-fuchsia-500 to-yellow-500 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Task Board</h1>
          <button
            onClick={() => {
              onLogout();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
          >
            LogOut
          </button>
        </div>

        {/* Task Form */}
        <form
          onSubmit={addTask}
          className="bg-white p-4 rounded-lg shadow-md mb-6"
        >
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}

          <div className="flex flex-col md:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="p-3 border rounded-md outline-none flex-1 focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
              required
              maxLength="50"
            />

            <input
              type="text"
              placeholder="Task Description (optional)"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="p-3 border rounded-md outline-none flex-1 focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
              maxLength="200"
            />

            <select
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
              className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition font-medium w-full md:w-auto"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Task List */}
      <TaskCards />
    </main>
  );
};

export default Home;
