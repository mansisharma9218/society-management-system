function Login() {
  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2 className="auth-title">Login</h2>

        <div className="auth-form">
          <input
            type="email"
            className="input"
            placeholder="Email"
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
          />

          <button className="btn btn-primary btn-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

