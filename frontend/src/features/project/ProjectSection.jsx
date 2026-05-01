function ProjectSection({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  projectForm,
  setProjectForm,
  onCreateProject,
  selectedProject,
  canManageProject,
  currentUserId,
  memberForm,
  setMemberForm,
  onAddMember,
  onRemoveMember,
  user,
}) {
  return (
    <section className="space-y-5 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Projects
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">Project workspace</h2>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
        <h2 className="mb-3 font-semibold text-slate-900">Create Project</h2>

        <form onSubmit={onCreateProject} className="space-y-2">
          <input
            type="text"
            placeholder="Project name"
            value={projectForm.name}
            onChange={(e) =>
              setProjectForm({ ...projectForm, name: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />

          <input
            type="text"
            placeholder="Description"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />

          <button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Create
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-semibold text-slate-900">Projects</h2>

        {projects.length === 0 ? (
          <p className="text-sm text-slate-500">No projects</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => setSelectedProjectId(project._id)}
              className={`mb-2 cursor-pointer rounded-2xl border p-3 transition hover:border-slate-300 hover:bg-slate-50 ${
                selectedProjectId === project._id
                  ? 'border-slate-400 bg-slate-100'
                  : ''
              }`}
            >
              <p className="font-medium text-slate-900">{project.name}</p>
              <p className="text-sm text-slate-500">
                {project.description || 'No description'}
              </p>
            </div>
          ))
        )}
      </div>

      {selectedProject && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-semibold text-slate-900">Members</h2>

          {(selectedProject.members || []).map((m, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between rounded-2xl border border-slate-200 p-3 last:mb-0"
            >
              <p className="text-sm text-slate-700">
                {m.user} <span className="text-slate-400">({m.role || 'Member'})</span>
              </p>

              {canManageProject && m.user !== currentUserId && (
                <button
                  onClick={() => onRemoveMember(m.user)}
                  className="text-sm font-medium text-rose-500 transition hover:text-rose-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {canManageProject && (
            <form onSubmit={onAddMember} className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Member email"
                value={memberForm.email}
                onChange={(e) =>
                  setMemberForm({ email: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
              />

              <button className="rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800">
                Add
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}

export default ProjectSection;