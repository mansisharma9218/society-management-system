import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", flat: "A-101", phone: "9876543210", role: "Resident", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", flat: "B-205", phone: "9876543211", role: "Resident", status: "Active" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", flat: "C-302", phone: "9876543212", role: "Secretary", status: "Active" },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", flat: "D-104", phone: "9876543213", role: "Resident", status: "Inactive" },
    { id: 5, name: "Ravi Verma", email: "ravi@example.com", flat: "E-201", phone: "9876543214", role: "Treasurer", status: "Active" },
    { id: 6, name: "Meera Singh", email: "meera@example.com", flat: "F-103", phone: "9876543215", role: "Resident", status: "Active" }
  ]);

  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    flat: "",
    phone: "",
    role: "Resident",
    status: "Active"
  });

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.flat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      alert("User deleted successfully!");
    }
  };

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setShowAddForm(false);
    setNewUser({
      name: "",
      email: "",
      flat: "",
      phone: "",
      role: "Resident",
      status: "Active"
    });
    alert("User added successfully!");
  };

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Resident Directory</h1>
          <p>Manage all society residents and committee members.</p>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleAddUser}>
            Add New User
          </button>
        </div>
      </section>

      <section className="card filter-card">
        <div className="filter-grid">
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
          
          <div className="filter-options">
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

      {/* Add User Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Add New User</h2>
            <p className="modal-subtitle">
              Enter user details below
            </p>

            <form onSubmit={handleSubmitUser}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="flat"
                  className="input"
                  placeholder="Flat Number (e.g., A-101)"
                  value={newUser.flat}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  placeholder="Phone Number"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="role"
                  className="input"
                  value={newUser.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Resident">Resident</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Chairman">Chairman</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  name="status"
                  className="input"
                  value={newUser.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-outline modal-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary modal-btn"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="card">
        <div className="card-header">
          <h3>All Users ({filteredUsers.length})</h3>
          <div className="table-count">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Flat Details</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredUsers.map((user) => (
    <tr key={user.id}>
      <td>
        <div className="table-primary">{user.name}</div>
        <div className="table-secondary">{user.email}</div>
      </td>
      <td>
        <div className="table-primary">{user.flat}</div>
        <div className="table-secondary">Block {user.flat?.charAt(0) || 'N/A'}</div>
      </td>
      <td>
        <div className="table-primary">{user.phone}</div>
      </td>
      <td>
        <div className="table-primary">{user.role}</div>
      </td>
      <td>
        <div className="table-primary">{user.status}</div>
      </td>
      <td>
        <button 
          className="btn btn-delete btn-sm"
          onClick={() => handleDeleteUser(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            No users found matching your filters
          </div>
        )}
      </section>
    </div>
  );
}

export default Users;