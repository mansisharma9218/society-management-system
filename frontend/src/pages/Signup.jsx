import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    flatNumber: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    // Add your signup logic here
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">
          Join your society management system
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="flatNumber"
              className="input"
              placeholder="Flat Number (e.g., A-101)"
              value={formData.flatNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              className="input"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              className="input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Create Account
          </button>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{" "}
              <span 
                className="auth-link"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;