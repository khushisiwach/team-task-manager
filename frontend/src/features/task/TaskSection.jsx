function TaskSection({
  selectedProject,
  canManageProject,
  taskForm,
  setTaskForm,
  onCreateTask,
  tasks,
  onStatusChange,
  onDeleteTask,
}) {
  return (
    <div className="space-y-5">

      {/* Create Task */}
      {selectedProject && canManageProject && (
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="font-semibold mb-2">Create Task</h2>

          <form onSubmit={onCreateTask} className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              value={taskForm.dueDate}
              onChange={(e) =>
                setTaskForm({ ...taskForm, dueDate: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <button className="bg-blue-600 text-white px-3 py-2 rounded">
              Create
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-semibold mb-2">Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="border p-3 rounded mb-2">

              <div className="flex justify-between items-center">
                <p className="font-medium">{task.title}</p>

                <select
                  value={task.status || 'To Do'}
                  onChange={(e) =>
                    onStatusChange(task._id, e.target.value)
                  }
                  className="border p-1 text-sm"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <p className="text-sm text-gray-500">
                {task.description || 'No description'}
              </p>

              <p className="text-sm text-gray-500">
                Due: {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'N/A'}
              </p>

              {canManageProject && (
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Delete
                </button>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default TaskSection;