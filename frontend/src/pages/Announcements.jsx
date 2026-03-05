import { useEffect, useState } from "react";
import { useAuthStore } from "../viewmodels/useAuthStore";
import { useAnnouncementStore } from "../viewmodels/useAnnouncementStore";

function Announcements() {
  const { user } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const {
    announcements,
    loading,
    saving,
    error,
    fetchAnnouncements,
    createAnnouncement,
    clearError,
  } = useAnnouncementStore();

  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({ title: "", message: "", expiryDate: "" });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await createAnnouncement({
      title: form.title.trim(),
      message: form.message.trim(),
      expiryDate: form.expiryDate || undefined,
    });
    if (ok) {
      setForm({ title: "", message: "", expiryDate: "" });
      setShowForm(false);
    }
  };

  const isExpired = (expiryDate) =>
    expiryDate && new Date(expiryDate) < new Date();

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Announcements</h1>
          <p>Stay updated with the latest society news.</p>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? "Cancel" : "+ New Announcement"}
          </button>
        )}
      </section>

      {/* Error Banner */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button
            onClick={clearError}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Create Form — admin only */}
      {isAdmin && showForm && (
        <section className="card compact">
          <h3 style={{ marginBottom: "1rem" }}>New Announcement</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                className="form-input"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Water Supply Interruption"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                className="form-input"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Write the full announcement here…"
                required
                style={{ resize: "vertical" }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date (optional)</label>
              <input
                className="form-input"
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Posting…" : "Post Announcement"}
            </button>
          </form>
        </section>
      )}

      {/* Announcements List */}
      {loading ? (
        <p style={{ textAlign: "center", color: "var(--color-muted, #888)", marginTop: "2rem" }}>
          Loading announcements…
        </p>
      ) : announcements.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "2rem", color: "var(--color-muted, #888)" }}>
          No announcements yet.
        </div>
      ) : (
        <div className="grid grid-2">
          {announcements.map((item) => {
            const expired = isExpired(item.expiryDate);
            return (
              <div key={item._id} className={`card compact${expired ? " card--muted" : ""}`}>
                <div className="card-header">
                  <h3 style={{ opacity: expired ? 0.6 : 1 }}>{item.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                    <span className="label">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    {expired && (
                      <span className="label" style={{ color: "#e53e3e", fontSize: "0.75rem" }}>
                        Expired
                      </span>
                    )}
                    {item.expiryDate && !expired && (
                      <span className="label" style={{ fontSize: "0.75rem", color: "var(--color-muted, #888)" }}>
                        Expires {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Always show a preview line */}
                <p style={{ opacity: expired ? 0.6 : 1 }}>
                  {expandedId === item._id
                    ? item.message
                    : item.message.length > 100
                    ? item.message.slice(0, 100) + "…"
                    : item.message}
                </p>

                {item.message.length > 100 && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      setExpandedId(expandedId === item._id ? null : item._id)
                    }
                  >
                    {expandedId === item._id ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Announcements;