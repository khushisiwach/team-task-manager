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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center mb-5">
          {mode === 'login' ? 'Login' : 'Signup'}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">

          {mode === 'signup' && (
            <div>
              <label className="text-sm">Name</label>
              <input
                type="text"
                value={authForm.name}
                onChange={(e) =>
                  setAuthForm({ ...authForm, name: e.target.value })
                }
                className="w-full border p-2 rounded mt-1"
              />
            </div>
          )}

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {mode === 'login' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <span
            onClick={() =>
              setMode(mode === 'login' ? 'signup' : 'login')
            }
            className="text-blue-600 cursor-pointer"
          >
            {mode === 'login' ? 'Signup' : 'Login'}
          </span>
        </p>

      </div>
    </div>
  );
}

export default AuthSection;