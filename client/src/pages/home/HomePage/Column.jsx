import TaskCard from "../TaskCard";

const Column = ({ title, tasks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-h-[300px]">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
