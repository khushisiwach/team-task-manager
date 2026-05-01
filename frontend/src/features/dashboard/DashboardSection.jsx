function DashboardSection({ dashboard }) {
  const data = dashboard || {};

  return (
    <section className="space-y-5 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Overview
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Dashboard</h2>
        </div>
        <p className="text-sm text-slate-500">A quick view of projects, task states, and overdue work.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard title="Projects" value={data.totalProjects || 0} />
        <StatCard title="Total Tasks" value={data.totalTasks || 0} />
        <StatCard title="To Do" value={data.todo || 0} />
        <StatCard title="In Progress" value={data.inProgress || 0} />
        <StatCard title="Done" value={data.done || 0} />
        <StatCard title="Overdue" value={data.overdue || 0} />
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent Tasks</h2>

        {(data.recentTasks || []).length === 0 ? (
          <p className="text-sm text-slate-500">No tasks found</p>
        ) : (
          data.recentTasks.map((task) => (
            <div key={task._id} className="mb-2 rounded-2xl border border-slate-200 bg-white p-3 last:mb-0">
              <p className="font-medium text-slate-900">{task.title}</p>
              <p className="text-sm text-slate-500">
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default DashboardSection;