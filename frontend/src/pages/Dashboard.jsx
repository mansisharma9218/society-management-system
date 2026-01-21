import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Hello XYZ</h1>
          <p>
            Overview of society activity, maintenance, complaints, and bookings.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/maintenance")}
          >
            Pay Maintenance
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/complaints")}
          >
            Raise Complaint
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-4">
        <div className="card stat">
          <h3>Total Residents</h3>
          <h2>128</h2>
          <p>Active members in society</p>
        </div>

        <div
          className="card stat"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/maintenance")}
        >
          <h3>Maintenance Due</h3>
          <h2>₹42,000</h2>
          <p>Pending for this month</p>
        </div>

        <div
          className="card stat"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/complaints")}
        >
          <h3>Open Complaints</h3>
          <h2>7</h2>
          <p>Awaiting resolution</p>
        </div>

        <div
          className="card stat"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/bookings")}
        >
          <h3>Facility Bookings</h3>
          <h2>3</h2>
          <p>Scheduled today</p>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="grid grid-2">
        <div className="card compact">
          <div className="card-header">
            <h3>Recent Announcements</h3>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate("/announcements")}
            >
              View All
            </button>
          </div>

          <ul className="list">
            <li>Water supply maintenance on Friday</li>
            <li>Annual general meeting this Sunday</li>
            <li>Parking rules updated</li>
          </ul>
        </div>

        <div className="card compact">
          <div className="card-header">
            <h3>Recent Complaints</h3>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate("/complaints")}
            >
              View All
            </button>
          </div>

          <ul className="list">
            <li>Lift not working – Block A</li>
            <li>Water leakage – Flat B-203</li>
            <li>Street light issue near gate</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
