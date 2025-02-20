const TaskCard = ({ task }) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskCard;
