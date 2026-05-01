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
    <section className="space-y-5 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Tasks
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">Task board</h2>
      </div>

      {selectedProject && canManageProject && (
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
          <h2 className="mb-3 font-semibold text-slate-900">Create Task</h2>

          <form onSubmit={onCreateTask} className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />

            <input
              type="text"
              placeholder="Description"
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />

            <input
              type="date"
              value={taskForm.dueDate}
              onChange={(e) =>
                setTaskForm({ ...taskForm, dueDate: e.target.value })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />

            <button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Create
            </button>
          </form>
        </div>
      )}

      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-semibold text-slate-900">Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 last:mb-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-900">{task.title}</p>

                <select
                  value={task.status || 'To Do'}
                  onChange={(e) =>
                    onStatusChange(task._id, e.target.value)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {task.description || 'No description'}
              </p>

              <p className="text-sm text-slate-500">
                Due: {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'N/A'}
              </p>

              {canManageProject && (
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="mt-3 text-sm font-medium text-rose-500 transition hover:text-rose-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default TaskSection;