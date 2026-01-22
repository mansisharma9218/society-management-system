import { useNavigate } from "react-router-dom";
function Flat() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>My Flat</h1>
          <p>Details of flats and residents.</p>
        </div>

        <div className="header-actions">
          <button className="btn btn-primary">Add Member</button>
          <button className="btn btn-outline" onClick={() => navigate("/users")}>
            View All Residents
          </button>
          <button className="btn btn-outline">View Documents</button>
        </div>
      </section>

      <section className="grid grid-4">
        <div className="card stat">
          <h3>Flat Number</h3>
          <h2>B-203</h2>
          <p>Block B, 2nd Floor</p>
        </div>

        <div className="card stat">
          <h3>Area</h3>
          <h2>1250 sq.ft.</h2>
          <p>3 BHK Apartment</p>
        </div>

        <div className="card stat">
          <h3>Monthly Maintenance</h3>
          <h2>₹5,200</h2>
          <p>Due on 10th every month</p>
        </div>

        <div className="card stat">
          <h3>Occupancy</h3>
          <h2>4 Members</h2>
          <p>2 Adults, 2 Children</p>
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card compact">
          <div className="card-header">
            <h3>Family Members</h3>
            <button className="btn btn-outline btn-sm">Manage</button>
          </div>
          <ul className="list">
            <li>John Doe (Owner)</li>
            <li>Jane Doe (Spouse)</li>
            <li>Emily Doe (Daughter)</li>
            <li>Michael Doe (Son)</li>
          </ul>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => navigate("/users")}
            style={{ marginTop: "12px" }}
          >
            Browse All Residents →
          </button>
        </div>

        <div className="card compact">
          <div className="card-header">
            <h3>Important Documents</h3>
            <button className="btn btn-outline btn-sm">View All</button>
          </div>
          <ul className="list">
            <li>Sale Deed</li>
            <li>Maintenance Receipts</li>
            <li>Utility Bills</li>
            <li>NOC Certificates</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="card">
          <div className="card-header">
            <h3>Recent Maintenance Payments</h3>
            <div>
              <button className="btn btn-outline btn-sm" onClick={() => navigate("/users")}>
                Compare with Neighbors
              </button>
              <button className="btn btn-outline btn-sm" style={{ marginLeft: "8px" }}>
                Full History
              </button>
            </div>
          </div>
          <div className="list">
            <div className="list-item">
              <span>January 2024</span>
              <span>₹5,200</span>
              <span className="status-paid">Paid</span>
            </div>
            <div className="list-item">
              <span>December 2023</span>
              <span>₹5,200</span>
              <span className="status-paid">Paid</span>
            </div>
            <div className="list-item">
              <span>November 2023</span>
              <span>₹5,200</span>
              <span className="status-paid">Paid</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Flat;