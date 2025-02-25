import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const TaskUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });
  const [loading, setLoading] = useState(false);

  // Fetch Task Data by ID
  const {
    data: task,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/tasks/${id}`
      );
      return data;
    },
  });

  useEffect(() => {
    if (task) {
      setUpdatedTask(task);
    }
  }, [task]); // Set task only when `task` is updated

  // console.log(task);

  // Handle Form Submission (Without useMutation)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { _id, ...updatedData } = updatedTask; // Remove `_id`
      await axios.put(`${import.meta.env.VITE_URL}/tasks/${id}`, updatedData);
      toast.success("Task Updated Successfully!");
      refetch(); // Refresh data
      navigate("/home"); // Redirect
    } catch (error) {
      console.error(error);
      toast.error("Update Failed!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-fuchsia-500 to-yellow-500 py-8 px-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Update Task
        </h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="text-gray-700 font-medium">Category</label>
          <select
            value={updatedTask.category}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, category: e.target.value })
            }
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Buttons: Update and Cancel */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition font-medium flex-1"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Task"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="bg-gray-400 text-white py-3 rounded-md shadow-md hover:bg-gray-500 transition font-medium flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskUpdate;
