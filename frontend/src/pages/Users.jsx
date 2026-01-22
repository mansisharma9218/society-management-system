import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  
  // Sample users data
  const [users] = useState([
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", flat: "A-101", phone: "9876543210", role: "Resident", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", flat: "B-205", phone: "9876543211", role: "Resident", status: "Active" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", flat: "C-302", phone: "9876543212", role: "Secretary", status: "Active" },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", flat: "D-104", phone: "9876543213", role: "Resident", status: "Inactive" },
    { id: 5, name: "Ravi Verma", email: "ravi@example.com", flat: "E-201", phone: "9876543214", role: "Treasurer", status: "Active" },
    { id: 6, name: "Meera Singh", email: "meera@example.com", flat: "F-103", phone: "9876543215", role: "Resident", status: "Active" }
  ]);

  // Filter states
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on selections
  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.flat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  // Get counts
  const totalResidents = users.filter(u => u.role === "Resident").length;
  const totalCommittee = users.filter(u => u.role !== "Resident").length;
  const activeUsers = users.filter(u => u.status === "Active").length;

  const handleViewUser = (userId) => {
    navigate(`/profile?userId=${userId}`);
  };

  const handleAddUser = () => {
    // Add new user logic here
    console.log("Add new user");
  };

  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header dashboard-header">
        <div>
          <h1>Resident Directory</h1>
          <p>Manage all society residents and committee members.</p>
        </div>

        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => navigate("/flats")}>
            View Flats
          </button>
          <button className="btn btn-primary" onClick={handleAddUser}>
            Add New User
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-4">
        <div className="card stat">
          <h3>Total Users</h3>
          <h2>{users.length}</h2>
          <p>All society members</p>
        </div>

        <div className="card stat">
          <h3>Residents</h3>
          <h2>{totalResidents}</h2>
          <p>Flat owners/tenants</p>
        </div>

        <div className="card stat">
          <h3>Committee</h3>
          <h2>{totalCommittee}</h2>
          <p>Managing committee</p>
        </div>

        <div className="card stat">
          <h3>Active</h3>
          <h2>{activeUsers}</h2>
          <p>Currently active</p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="card" style={{ marginBottom: "24px" }}>
        <div className="grid grid-2" style={{ gap: "20px" }}>
          <div>
            <label className="label">Search Users</label>
            <input
              type="text"
              className="input"
              placeholder="Search by name, flat, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-2" style={{ gap: "20px" }}>
            <div>
              <label className="label">Filter by Role</label>
              <select 
                className="input"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="Resident">Resident</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Chairman">Chairman</option>
              </select>
            </div>
            
            <div>
              <label className="label">Filter by Status</label>
              <select 
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Users Table */}
      <section className="card">
        <div className="card-header">
          <h3>All Users ({filteredUsers.length})</h3>
          <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <th style={{ textAlign: "left", padding: "16px", fontSize: "14px", fontWeight: "500" }}>Name</th>
                <th style={{ textAlign: "left", padding: "16px", fontSize: "14px", fontWeight: "500" }}>Flat Details</th>
                <th style={{ textAlign: "left", padding: "16px", fontSize: "14px", fontWeight: "500" }}>Contact</th>
                <th style={{ textAlign: "left", padding: "16px", fontSize: "14px", fontWeight: "500" }}>Role</th>
                <th style={{ textAlign: "left", padding: "16px", fontSize: "14px", fontWeight: "500" }}>Status</th>
                <th style={{ textAlign: "left", padding: "16px", fontSize: "14px", fontWeight: "500" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "500" }}>{user.name}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{user.email}</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "500" }}>{user.flat}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Block {user.flat.charAt(0)}</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>{user.phone}</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>{user.role}</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>{user.status}</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => handleViewUser(user.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            No users found matching your filters
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="grid grid-2">
        <div className="card compact">
          <div className="card-header">
            <h3>Export Data</h3>
          </div>
          <p style={{ marginBottom: "16px" }}>Download user directory for records.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-outline btn-sm">
              Export as CSV
            </button>
            <button className="btn btn-outline btn-sm">
              Print List
            </button>
          </div>
        </div>

        <div className="card compact">
          <div className="card-header">
            <h3>Bulk Actions</h3>
          </div>
          <p style={{ marginBottom: "16px" }}>Send notifications or update multiple users.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-outline btn-sm">
              Send Announcement
            </button>
            <button className="btn btn-outline btn-sm">
              Update Status
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Users;