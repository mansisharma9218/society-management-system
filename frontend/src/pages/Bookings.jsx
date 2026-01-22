import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const navigate = useNavigate();
  
  const [bookings] = useState([
    { id: 1, facility: "Club House", date: "2024-01-25", time: "18:00 - 21:00", bookedBy: "Rajesh Kumar", flat: "A-101", status: "Confirmed" },
    { id: 2, facility: "Swimming Pool", date: "2024-01-26", time: "15:00 - 17:00", bookedBy: "Priya Sharma", flat: "B-205", status: "Pending" },
    { id: 3, facility: "Tennis Court", date: "2024-01-24", time: "07:00 - 09:00", bookedBy: "Amit Patel", flat: "C-302", status: "Confirmed" },
    { id: 4, facility: "Gym", date: "2024-01-27", time: "19:00 - 20:00", bookedBy: "Sneha Reddy", flat: "D-104", status: "Cancelled" }
  ]);

  const [facilities] = useState([
    { name: "Club House", rate: "₹2,500/hour", capacity: "100 persons" },
    { name: "Swimming Pool", rate: "₹1,000/hour", capacity: "30 persons" },
    { name: "Tennis Court", rate: "₹800/hour", capacity: "4 persons" },
    { name: "Gym", rate: "₹500/hour", capacity: "15 persons" }
  ]);

  const [newBooking, setNewBooking] = useState({
    facility: "",
    date: "",
    time: "",
    purpose: ""
  });

  const handleNewBooking = () => {
    console.log("New booking:", newBooking);
    alert("Booking request submitted!");
    setNewBooking({ facility: "", date: "", time: "", purpose: "" });
  };

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Facility Bookings</h1>
          <p>Manage and schedule society amenities and facilities.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => navigate("/facilities")}>
            View Facilities
          </button>
        </div>
      </section>

      <section className="grid grid-4">
        <div className="card stat">
          <h3>Today's Bookings</h3>
          <h2>3</h2>
          <p>Scheduled for today</p>
        </div>
        <div className="card stat">
          <h3>Upcoming</h3>
          <h2>12</h2>
          <p>Next 7 days</p>
        </div>
        <div className="card stat">
          <h3>Pending</h3>
          <h2>5</h2>
          <p>Awaiting approval</p>
        </div>
        <div className="card stat">
          <h3>Most Booked</h3>
          <h2>Club House</h2>
          <p>Popular facility</p>
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card compact">
          <div className="card-header">
            <h3>Recent Bookings</h3>
            <button className="btn btn-outline btn-sm">
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Facility</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="table-primary">{booking.facility}</div>
                      <div className="table-secondary">{booking.flat}</div>
                    </td>
                    <td>
                      <div className="table-primary">{booking.date}</div>
                      <div className="table-secondary">{booking.time}</div>
                    </td>
                    <td>
                      <div className="table-primary">{booking.status}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card compact">
          <div className="card-header">
            <h3>Book New Facility</h3>
          </div>
          <div className="form-group">
            <label className="label">Select Facility</label>
            <select 
              className="input"
              value={newBooking.facility}
              onChange={(e) => setNewBooking({...newBooking, facility: e.target.value})}
            >
              <option value="">Choose a facility</option>
              {facilities.map((facility, index) => (
                <option key={index} value={facility.name}>{facility.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              value={newBooking.date}
              onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="label">Time Slot</label>
            <select 
              className="input"
              value={newBooking.time}
              onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
            >
              <option value="">Select time</option>
              <option value="07:00 - 09:00">Morning: 7 AM - 9 AM</option>
              <option value="10:00 - 12:00">Late Morning: 10 AM - 12 PM</option>
              <option value="15:00 - 17:00">Afternoon: 3 PM - 5 PM</option>
              <option value="18:00 - 21:00">Evening: 6 PM - 9 PM</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Purpose (Optional)</label>
            <input
              type="text"
              className="input"
              placeholder="Birthday party, Anniversary, etc."
              value={newBooking.purpose}
              onChange={(e) => setNewBooking({...newBooking, purpose: e.target.value})}
            />
          </div>
          <button 
            className="btn btn-primary btn-full"
            onClick={handleNewBooking}
            disabled={!newBooking.facility || !newBooking.date || !newBooking.time}
          >
            Submit Booking Request
          </button>
        </div>
      </section>
    </div>
  );
}

export default Bookings;