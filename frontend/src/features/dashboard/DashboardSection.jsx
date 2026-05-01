function DashboardSection({ dashboard }) {
  const data = dashboard || {};

  return (
    <div className="space-y-5">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard title="Projects" value={data.totalProjects || 0} />
        <StatCard title="Total Tasks" value={data.totalTasks || 0} />
        <StatCard title="To Do" value={data.todo || 0} />
        <StatCard title="In Progress" value={data.inProgress || 0} />
        <StatCard title="Done" value={data.done || 0} />
        <StatCard title="Overdue" value={data.overdue || 0} />
      </div>

      {/* Recent Tasks */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Recent Tasks</h2>

        {(data.recentTasks || []).length === 0 ? (
          <p className="text-sm text-gray-500">No tasks found</p>
        ) : (
          data.recentTasks.map((task) => (
            <div key={task._id} className="border p-2 rounded mb-2">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default DashboardSection;