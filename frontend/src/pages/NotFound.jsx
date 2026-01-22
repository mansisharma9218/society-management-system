import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="card auth-card" style={{ maxWidth: "480px", textAlign: "center" }}>
        <div style={{ marginBottom: "24px" }}>
          {/* You could add an icon here */}
          <div style={{
            fontSize: "72px",
            fontWeight: "700",
            color: "var(--primary)",
            marginBottom: "16px",
            opacity: 0.8
          }}>
            404
          </div>
          <h1 className="auth-title" style={{ marginBottom: "12px" }}>Page Not Found</h1>
          <p className="auth-subtitle">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button 
            className="btn btn-primary btn-full"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
          
          <button 
            className="btn btn-outline btn-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

        <div className="auth-footer" style={{ marginTop: "32px" }}>
          <p className="auth-footer-text">
            Need help?{" "}
            <span 
              className="auth-link" 
              onClick={() => navigate("/complaints")}
              style={{ cursor: "pointer" }}
            >
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;