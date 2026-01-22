import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const navigate = useNavigate();
  
  // Sample user data
  const userData = {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "9876543210",
    flat: "A-101",
    role: "Resident",
    memberSince: "Jan 2023",
    emergencyContact: "9876543211"
  };

  const handleLogout = () => {
    // Call the logout function from App.jsx
    if (onLogout) {
      onLogout();
    }
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="page">
      {/* Page Header with Logout Button */}
      <section className="page-header dashboard-header">
        <div>
          <h1>My Profile</h1>
          <p>View and update your profile information.</p>
        </div>

        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      {/* Profile Info Grid */}
      <section className="grid grid-2">
        {/* Personal Information Card */}
        <div className="card">
          <div className="card-header">
            <h3>Personal Information</h3>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => alert("Edit profile functionality to be added")}
            >
              Edit
            </button>
          </div>
          
          <div className="form-group">
            <label className="label">Full Name</label>
            <div className="profile-field">{userData.name}</div>
          </div>
          
          <div className="form-group">
            <label className="label">Email Address</label>
            <div className="profile-field">{userData.email}</div>
          </div>
          
          <div className="form-group">
            <label className="label">Phone Number</label>
            <div className="profile-field">{userData.phone}</div>
          </div>
          
          <div className="form-group">
            <label className="label">Emergency Contact</label>
            <div className="profile-field">{userData.emergencyContact}</div>
          </div>
        </div>

        {/* Society Information Card */}
        <div className="card">
          <div className="card-header">
            <h3>Society Information</h3>
          </div>
          
          <div className="form-group">
            <label className="label">Flat Number</label>
            <div className="profile-field">{userData.flat}</div>
          </div>
          
          <div className="form-group">
            <label className="label">Role</label>
            <div className="profile-field">{userData.role}</div>
          </div>
          
          <div className="form-group">
            <label className="label">Member Since</label>
            <div className="profile-field">{userData.memberSince}</div>
          </div>
          
          <div className="form-group">
            <label className="label">Building/Block</label>
            <div className="profile-field">Block A</div>
          </div>
        </div>
      </section>

      {/* Account Actions */}
      <section className="card">
        <div className="card-header">
          <h3>Account Actions</h3>
        </div>
        
        <div className="grid grid-2" style={{ gap: "16px" }}>
          <button 
            className="btn btn-outline"
            onClick={() => alert("Change password functionality")}
          >
            Change Password
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => alert("Update contact details")}
          >
            Update Contact
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => navigate("/maintenance")}
          >
            View Maintenance History
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => navigate("/complaints")}
          >
            My Complaints
          </button>
        </div>
      </section>
    </div>
  );
}

export default Profile;