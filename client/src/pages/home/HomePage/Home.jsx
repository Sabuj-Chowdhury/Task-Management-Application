import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column";

const Home = () => {
  const [tasks, setTasks] = useState({
    "To-Do": [],
    "In Progress": [],
    Done: [],
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/tasks`);
      console.log("Raw Response:", response);

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Data:", data);

      const formattedTasks = { "To-Do": [], "In Progress": [], Done: [] };
      data.forEach((task) => {
        formattedTasks[task.category].push(task);
      });

      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

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

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const savedTask = await response.json();
      console.log("Saved Task:", savedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [savedTask.category]: [...prevTasks[savedTask.category], savedTask],
      }));

      setNewTask({ title: "", description: "", category: "To-Do" });
    } catch (error) {
      console.error("Error adding task:", error.message);
      setError(error.message);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromCategory = active.data.current.category;
    const toCategory = over.data.current.category;

    if (fromCategory !== toCategory) {
      setTasks((prevTasks) => {
        const fromList = prevTasks[fromCategory].filter(
          (task) => task._id !== active.id
        );
        const movedTask = prevTasks[fromCategory].find(
          (task) => task._id === active.id
        );
        const updatedTask = { ...movedTask, category: toCategory };

        fetch(`${import.meta.env.VITE_API_URL}/tasks/${active.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });

        const toList = [...prevTasks[toCategory], updatedTask];

        return {
          ...prevTasks,
          [fromCategory]: fromList,
          [toCategory]: toList,
        };
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-400 via-fuchsia-500 to-yellow-500 py-8 px-4">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Task Board</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            LogOut
          </button>
        </div>

        {/* Task Form */}
        <form
          onSubmit={addTask}
          className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col gap-4"
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="text"
            placeholder="Task Title (max 50 characters)"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="p-2 border rounded-md"
            required
            maxLength="50"
          />

          <textarea
            placeholder="Task Description (optional, max 200 characters)"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="p-2 border rounded-md"
            maxLength="200"
          />

          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="p-2 border rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add Task
          </button>
        </form>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(tasks).map((category) => (
              <SortableContext
                key={category}
                items={tasks[category]}
                strategy={verticalListSortingStrategy}
              >
                <Column title={category} tasks={tasks[category]} />
              </SortableContext>
            ))}
          </div>
        </DndContext>
      </div>
    </main>
  );
};

export default Home;
