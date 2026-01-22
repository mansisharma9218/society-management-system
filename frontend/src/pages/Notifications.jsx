function Notifications() {
  const notifications = [
    { id: 1, message: "Bill generated for October.", time: "2h ago" },
    { id: 2, message: "Complaint #1024 resolved.", time: "1d ago" }
  ];

  return (
    <div className="page">
      <section className="page-header">
        <h1>Notifications</h1>
        <p>Your recent activity and updates.</p>
      </section>

      <div className="card">
        <div className="nav">
          {notifications.map((note, index) => (
            <div key={note.id}>
              <div className="card-header">
                <p>{note.message}</p>
                <span className="label">{note.time}</span>
              </div>
              {index !== notifications.length - 1 && <div className="nav-divider" />}
            </div>
          ))}
        </div>
        
        <div className="card-header">
          <button className="btn btn-outline btn-full">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notifications;