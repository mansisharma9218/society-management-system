import { useNavigate } from "react-router-dom";

import sidebarIcon from "../assets/icons/sidebar.svg";
import announcementIcon from "../assets/icons/announcements.svg";
import notificationIcon from "../assets/icons/notification.svg";
import profileIcon from "../assets/icons/profile.svg";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      
      <div className="navbar-left">
        <button className="icon-btn" onClick={onMenuClick}>
          <img src={sidebarIcon} alt="Toggle sidebar" />
        </button>

        <h1
          className="navbar-title"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          SocietyHub
        </h1>
      </div>

      
      <div className="navbar-right">
        <button
          className="icon-btn"
          title="Announcements"
          onClick={() => navigate("/announcements")}
        >
          <img src={announcementIcon} alt="Announcements" />
        </button>

        <button
          className="icon-btn"
          title="Notifications"
          onClick={() => navigate("/notifications")}
        >
          <img src={notificationIcon} alt="Notifications" />
        </button>

        <button
          className="icon-btn"
          title="Profile"
          onClick={() => navigate("/profile")}
        >
          <img src={profileIcon} alt="Profile" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
