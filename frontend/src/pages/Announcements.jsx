import { useState } from "react";

function Announcements() {
  const [expandedId, setExpandedId] = useState(null);

  const announcements = [
    { 
      id: 1, 
      title: "Water Supply", 
      date: "24 Oct", 
      content: "Maintenance from 10 AM to 4 PM.",
      details: "The overhead tanks for Blocks A and B will undergo deep cleaning. Please store sufficient water in advance. Supply will resume normally after 5 PM."
    },
    { 
      id: 2, 
      title: "Society Meeting", 
      date: "28 Oct", 
      content: "AGM at the community hall.",
      details: "The Annual General Meeting will discuss the upcoming painting project, security upgrades, and the new waste management system. High attendance is requested."
    }
  ];

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page">
      <section className="page-header">
        <h1>Announcements</h1>
        <p>Stay updated with the latest society news.</p>
      </section>

      <div className="grid grid-2">
        {announcements.map((item) => (
          <div key={item.id} className="card compact">
            <div className="card-header">
              <h3>{item.title}</h3>
              <span className="label">{item.date}</span>
            </div>
            
            <p>{item.content}</p>

            {/* Content toggled based on state */}
            {expandedId === item.id && (
              <div className="nav">
                <div className="nav-divider" />
                <p>{item.details}</p>
              </div>
            )}

            <button 
              className="btn btn-outline btn-sm"
              onClick={() => handleToggle(item.id)}
            >
              {expandedId === item.id ? "Show Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcements;