import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";

const TaskCards = () => {
  const { user } = useContext(AuthContext);
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/tasks/${user?.email}`
      );
      return data;
    },
  });

  const updateTaskCategory = useMutation({
    mutationFn: async ({ taskId, newCategory }) => {
      await axios.put(`${import.meta.env.VITE_URL}/tasks/${taskId}`, {
        category: newCategory,
      });
    },
    onSuccess: () => {
      refetch(); // Refresh tasks after update
    },
  });

  if (isLoading) return <Spinner />;

  // Group tasks by category
  const groupedTasks = tasks?.reduce((acc, task) => {
    acc[task.category] = acc[task.category] || [];
    acc[task.category].push(task);
    return acc;
  }, {});

  // Handle Drag and Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newCategory = destination.droppableId;

    updateTaskCategory.mutate({ taskId: draggableId, newCategory });
    toast.success("Task moved successfully!");
  };

  // Delete Task Function
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/tasks/${taskId}`);
      toast.success("Task Deleted!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to Delete!");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="max-w-7xl mx-auto my-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(groupedTasks || {}).map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {category}
                </h2>

                <div className="flex flex-col gap-4 h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                  {groupedTasks[category].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 shadow-md rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h3 className="text-lg font-semibold">
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {task.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(task.timestamp).toLocaleString()}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <FaTrash size={18} />
                            </button>

                            <Link
                              to={`/task/${task._id}`}
                              className="text-blue-500 hover:text-blue-700 transition"
                            >
                              <FaEdit size={18} />
                            </Link>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskCards;
