import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from './api';
import AuthSection from './features/auth/AuthSection';
import ProjectSection from './features/project/ProjectSection';
import TaskSection from './features/task/TaskSection';
import DashboardSection from './features/dashboard/DashboardSection';
import { getId } from './utils/getId';

const authInitial = { name: '', email: '', password: '' };
const projectInitial = { name: '', description: '' };
const memberInitial = { email: '' };
const taskInitial = { title: '', description: '', dueDate: '' };

function App() {
  const [token, setToken] = useState(localStorage.getItem('ttm_token') || '');
  const [user, setUser] = useState(null);

  const [mode, setMode] = useState('login');
  const [authForm, setAuthForm] = useState(authInitial);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [dashboard, setDashboard] = useState({});

  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [projectForm, setProjectForm] = useState(projectInitial);
  const [memberForm, setMemberForm] = useState(memberInitial);
  const [taskForm, setTaskForm] = useState(taskInitial);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const selectedProject = useMemo(() => {
    return projects.find((p) => getId(p) === getId(selectedProjectId)) || null;
  }, [projects, selectedProjectId]);

  const currentUserId = getId(user?._id || user?.id);
  const isAdminUser = String(user?.role || '').toLowerCase() === 'admin';

  const canManageProject = useMemo(() => {
    if (!selectedProject) return false;

    return (selectedProject.members || []).some(
      (m) => getId(m.user) === currentUserId && m.role === 'Admin'
    );
  }, [selectedProject, currentUserId]);

  const filteredTasks = useMemo(() => {
    if (!selectedProjectId) return tasks;
    return tasks.filter((t) => getId(t.project) === getId(selectedProjectId));
  }, [tasks, selectedProjectId]);

  const clearNotice = () => {
    setError('');
    setMessage('');
  };

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const [meData, projectData, taskData, dashboardData] = await Promise.all([
          apiRequest('/auth/me', {}, token),
          apiRequest('/projects', {}, token),
          apiRequest('/tasks', {}, token),
          apiRequest('/dashboard', {}, token),
        ]);

        setUser(meData.user);
        setProjects(projectData.projects || []);
        setTasks(taskData.tasks || []);
        setDashboard(dashboardData || {});

        if (projectData.projects?.length) {
          setSelectedProjectId(getId(projectData.projects[0]));
        }
      } catch {
        logout();
      }
    })();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('ttm_token');
    setToken('');
    setUser(null);
    setProjects([]);
    setTasks([]);
    setSelectedProjectId('');
    clearNotice();
  };

  const onAuthSubmit = async (e) => {
    e.preventDefault();
    clearNotice();
    setLoading(true);

    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/signup';
      const payload =
        mode === 'login'
          ? { email: authForm.email, password: authForm.password }
          : authForm;

      const data = await apiRequest(path, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (mode === 'signup') {
        setMode('login');
        setAuthForm(authInitial);
        setMessage('Signup successful! Please login now.');
      } else {
        localStorage.setItem('ttm_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setAuthForm(authInitial);
        setMessage('Success');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onCreateProject = async (e) => {
    e.preventDefault();
    clearNotice();
    setLoading(true);

    try {
      const data = await apiRequest(
        '/projects',
        {
          method: 'POST',
          body: JSON.stringify(projectForm),
        },
        token
      );

      const newProject = data.project;
      setProjects((prev) => [...prev, newProject]);
      setSelectedProjectId(getId(newProject));

      setProjectForm(projectInitial);
      setMessage('Project created');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onAddMember = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) return;

    clearNotice();
    setLoading(true);

    try {
      const data = await apiRequest(
        `/projects/${selectedProjectId}/members`,
        {
          method: 'POST',
          body: JSON.stringify(memberForm),
        },
        token
      );

      setProjects((prev) =>
        prev.map((p) =>
          getId(p) === getId(selectedProjectId)
            ? { ...p, members: data.members }
            : p
        )
      );

      setMemberForm(memberInitial);
      setMessage('Member added');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRemoveMember = async (memberUserId) => {
    clearNotice();

    try {
      const data = await apiRequest(
        `/projects/${selectedProjectId}/members/${memberUserId}`,
        { method: 'DELETE' },
        token
      );

      setProjects((prev) =>
        prev.map((p) =>
          getId(p) === getId(selectedProjectId)
            ? { ...p, members: data.members }
            : p
        )
      );

      setMessage('Member removed');
    } catch (err) {
      setError(err.message);
    }
  };

  const onCreateTask = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) return;

    clearNotice();
    setLoading(true);

    try {
      const data = await apiRequest(
        '/tasks',
        {
          method: 'POST',
          body: JSON.stringify({
            projectId: selectedProjectId,
            ...taskForm,
          }),
        },
        token
      );

      setTasks((prev) => [...prev, data.task]);
      setTaskForm(taskInitial);
      setMessage('Task created');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async (taskId, status) => {
    clearNotice();

    try {
      await apiRequest(
        `/tasks/${taskId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        },
        token
      );

      setTasks((prev) =>
        prev.map((t) =>
          getId(t) === getId(taskId) ? { ...t, status } : t
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const onDeleteTask = async (taskId) => {
    clearNotice();

    try {
      await apiRequest(`/tasks/${taskId}`, { method: 'DELETE' }, token);

      setTasks((prev) => prev.filter((t) => getId(t) !== getId(taskId)));
      setMessage('Task deleted');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!token || !user) {
    return (
      <AuthSection
        mode={mode}
        setMode={setMode}
        authForm={authForm}
        setAuthForm={setAuthForm}
        onSubmit={onAuthSubmit}
        loading={loading}
        error={error}
        message={message}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e2e8f0_0%,_#f8fafc_38%,_#eef2ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <nav className="mb-6 border-b border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Team Task Manager</h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className={`text-xs font-medium ${
                  isAdminUser
                    ? 'text-emerald-600' 
                    : 'text-blue-600'
                }`}>
                  {isAdminUser ? 'Admin' : 'Member'}
                </p>
              </div>

              <button
                onClick={logout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="flex-1 space-y-6 py-6">
          <DashboardSection dashboard={dashboard} />

          <main className="grid gap-6 lg:grid-cols-2">
            <ProjectSection
              projects={projects}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              onCreateProject={onCreateProject}
              selectedProject={selectedProject}
              canManageProject={canManageProject}
              currentUserId={currentUserId}
              memberForm={memberForm}
              setMemberForm={setMemberForm}
              onAddMember={onAddMember}
              onRemoveMember={onRemoveMember}
              user={user}
            />

            <TaskSection
              selectedProject={selectedProject}
              canManageProject={canManageProject}
              taskForm={taskForm}
              setTaskForm={setTaskForm}
              onCreateTask={onCreateTask}
              tasks={filteredTasks}
              onStatusChange={onStatusChange}
              onDeleteTask={onDeleteTask}
            />
          </main>

          {(error || message) && (
            <div className="flex flex-col gap-2 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
              {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
              {message && <p className="text-sm font-medium text-emerald-600">{message}</p>}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

export default App;