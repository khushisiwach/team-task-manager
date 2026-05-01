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
}) {
  return (
    <div className="space-y-5">

      {/* Create Project */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-semibold mb-2">Create Project</h2>

        <form onSubmit={onCreateProject} className="space-y-2">
          <input
            type="text"
            placeholder="Project name"
            value={projectForm.name}
            onChange={(e) =>
              setProjectForm({ ...projectForm, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Description"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <button className="bg-blue-600 text-white px-3 py-2 rounded">
            Create
          </button>
        </form>
      </div>

      {/* Project List */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="font-semibold mb-2">Projects</h2>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-500">No projects</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => setSelectedProjectId(project._id)}
              className={`border p-2 rounded mb-2 cursor-pointer ${
                selectedProjectId === project._id
                  ? 'bg-gray-100'
                  : ''
              }`}
            >
              <p className="font-medium">{project.name}</p>
              <p className="text-sm text-gray-500">
                {project.description || 'No description'}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Members */}
      {selectedProject && (
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="font-semibold mb-3">Members</h2>

          {(selectedProject.members || []).map((m, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded mb-2"
            >
              <p className="text-sm">
                {m.user} ({m.role || 'Member'})
              </p>

              {canManageProject && m.user !== currentUserId && (
                <button
                  onClick={() => onRemoveMember(m.user)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {canManageProject && (
            <form onSubmit={onAddMember} className="flex gap-2 mt-3">
              <input
                type="email"
                placeholder="Member email"
                value={memberForm.email}
                onChange={(e) =>
                  setMemberForm({ email: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <button className="bg-black text-white px-3 rounded">
                Add
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}

export default ProjectSection;