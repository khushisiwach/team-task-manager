function AuthSection({
  mode,
  setMode,
  authForm,
  setAuthForm,
  onSubmit,
  loading,
  error,
  message,
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cbd5e1_0%,_#f8fafc_44%,_#eef2ff_100%)] px-4 py-10 text-slate-900 sm:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden flex-col justify-between bg-slate-950 p-8 text-white lg:flex">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                Team Task Manager
              </p>
              <h2 className="mt-4 max-w-sm text-4xl font-semibold leading-tight">
                Clean task control for modern team workflows.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Sign in to manage projects, assign work, and keep admin/member permissions organized in one place.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Role-based access with Admin and Member views.</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Simple project tracking with task status updates.</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Minimal, clean interface with fast navigation.</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Welcome back
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-900">
                  {mode === 'login' ? 'Login' : 'Create account'}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                {mode === 'login' ? 'Member access' : 'New user setup'}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, name: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                  placeholder="Enter your password"
                />
              </div>

              {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>}
              {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Signup'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              {mode === 'login' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
              <span
                onClick={() =>
                  setMode(mode === 'login' ? 'signup' : 'login')
                }
                className="cursor-pointer font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
              >
                {mode === 'login' ? 'Signup' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthSection;