import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../viewmodels/useAuthStore";
import { useApplicationStore } from "../viewmodels/useApplicationStore";
import { useAnnouncementStore } from "../viewmodels/useAnnouncementStore";
import { useComplaintStore } from "../viewmodels/useComplaintStore";
import { useMaintenanceBillStore } from "../viewmodels/useMaintenanceBillStore";
import { useFlatStore } from "../viewmodels/useFlatStore";
import { useBookingStore } from "../viewmodels/useBookingStore";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const { applications, fetchApplications } = useApplicationStore();
  const { announcements, fetchAnnouncements } = useAnnouncementStore();
  const { complaints, fetchComplaints } = useComplaintStore();
  const { bills, fetchBills } = useMaintenanceBillStore();
  const { flats, fetchFlats } = useFlatStore();
  const { bookings, fetchBookings } = useBookingStore();

  // Fetch data on mount
  useEffect(() => {
    fetchAnnouncements();
    fetchComplaints();
    fetchBills();
    fetchBookings();
    if (isAdmin) {
      fetchApplications();
      fetchFlats();
    }
  }, [isAdmin]);

  // Up to 3 active (non-expired) announcements for the widget
  const recentAnnouncements = announcements
    .filter((a) => !a.expiryDate || new Date(a.expiryDate) >= new Date())
    .slice(0, 3);

  const pendingCount = applications.length;
  // Show up to 3 most recent in the dashboard widget
  const recentApplications = applications.slice(0, 3);

  // Derived stats
  const occupiedFlatsCount = flats.filter((f) => f.isActive).length;
  const openComplaintsCount = complaints.filter(
    (c) => c.status !== "RESOLVED" && c.status !== "CLOSED"
  ).length;
  const unpaidBillsTotal = bills
    .filter((b) => b.status === "UNPAID")
    .reduce((sum, b) => sum + (b.amount || 0), 0);
  const today = new Date().toISOString().split("T")[0];
  const todayBookingsCount = bookings.filter(
    (b) => b.date && b.date.startsWith(today)
  ).length;
  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Hello {user?.name ?? ""}</h1>
          <p>Overview of society activity, maintenance, complaints, and bookings.</p>
        </div>

        <div className="header-actions">
          {!isAdmin && (
            <button className="btn btn-primary" onClick={() => navigate("/maintenance")}>
              Pay Maintenance
            </button>
          )}
          <button className="btn btn-outline" onClick={() => navigate("/complaints")}>
            {isAdmin ? "View Complaints" : "Raise Complaint"}
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-4">
        {isAdmin ? (
          // ── Admin stats ───────────────────────────────────────────────────
          <>
            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/applications")}
            >
              <h3>Pending Applications</h3>
              <h2>{pendingCount}</h2>
              <p>Awaiting your review</p>
            </div>

            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/users")}
            >
              <h3>Total Residents</h3>
              <h2>{occupiedFlatsCount}</h2>
              <p>Active members in society</p>
            </div>

            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/maintenance")}
            >
              <h3>Maintenance Due</h3>
              <h2>₹{unpaidBillsTotal.toLocaleString("en-IN")}</h2>
              <p>Pending for this month</p>
            </div>

            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/complaints")}
            >
              <h3>Open Complaints</h3>
              <h2>{openComplaintsCount}</h2>
              <p>Awaiting resolution</p>
            </div>
          </>
        ) : (
          // ── Resident stats ────────────────────────────────────────────────
          <>
            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/maintenance")}
            >
              <h3>Maintenance Due</h3>
              <h2>₹{unpaidBillsTotal.toLocaleString("en-IN")}</h2>
              <p>Unpaid bills total</p>
            </div>

            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/complaints")}
            >
              <h3>My Complaints</h3>
              <h2>{complaints.length}</h2>
              <p>{openComplaintsCount} open</p>
            </div>

            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/bookings")}
            >
              <h3>My Bookings</h3>
              <h2>{bookings.length}</h2>
              <p>{todayBookingsCount} scheduled today</p>
            </div>

            <div
              className="card stat"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/announcements")}
            >
              <h3>Announcements</h3>
              <h2>{announcements.length}</h2>
              <p>Society notices</p>
            </div>
          </>
        )}
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
          {recentAnnouncements.length === 0 ? (
            <p style={{ color: "var(--text-muted)", padding: "12px 0" }}>
              No announcements yet.
            </p>
          ) : (
            <ul className="list">
              {recentAnnouncements.map((a) => (
                <li key={a._id}>
                  <strong>{a.title}</strong>
                  {a.message.length > 60
                    ? " — " + a.message.slice(0, 60) + "…"
                    : " — " + a.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        {isAdmin ? (
          // ── Admin: pending applications mini-list ─────────────────────────
          <div className="card compact">
            <div className="card-header">
              <h3>Pending Applications</h3>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate("/applications")}
              >
                View All
              </button>
            </div>

            {pendingCount === 0 ? (
              <p style={{ color: "var(--text-muted)", padding: "12px 0" }}>
                No pending applications.
              </p>
            ) : (
              <ul className="list">
                {recentApplications.map((app) => (
                  <li
                    key={app._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/applications")}
                  >
                    <strong>{app.name}</strong>
                    <span style={{ color: "var(--text-muted)", marginLeft: "6px", fontSize: "0.85rem" }}>
                      {app.email}
                    </span>
                  </li>
                ))}
                {pendingCount > 3 && (
                  <li
                    style={{ color: "var(--primary)", cursor: "pointer" }}
                    onClick={() => navigate("/applications")}
                  >
                    +{pendingCount - 3} more
                  </li>
                )}
              </ul>
            )}
          </div>
        ) : (
          // ── Resident: recent complaints ───────────────────────────────────
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
            {recentComplaints.length === 0 ? (
              <p style={{ color: "var(--text-muted)", padding: "12px 0" }}>
                No complaints yet.
              </p>
            ) : (
              <ul className="list">
                {recentComplaints.map((c) => (
                  <li key={c._id}>
                    <strong>{c.category}</strong>
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "0.8rem",
                        color:
                          c.status === "RESOLVED"
                            ? "var(--success)"
                            : c.status === "IN_PROGRESS"
                            ? "var(--warning)"
                            : "var(--danger)",
                      }}
                    >
                      {c.status}
                    </span>
                    {c.description && (
                      <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.82rem" }}>
                        {c.description.length > 55
                          ? c.description.slice(0, 55) + "…"
                          : c.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
