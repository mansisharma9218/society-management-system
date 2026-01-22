import { useNavigate } from "react-router-dom";

function Facilities() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Facilities</h1>
          <p>
            Book and manage society amenities like clubhouse, gym, pool, and more.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/bookings")}
          >
            Book Facility
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </button>
        </div>
      </section>

      {/* Available Facilities */}
      <section className="grid grid-4">
        <div className="card stat">
          <h3>Clubhouse</h3>
          <h2>Available</h2>
          <p>Capacity: 100 people</p>
          <button className="btn btn-primary btn-sm">Book Now</button>
        </div>

        <div className="card stat">
          <h3>Swimming Pool</h3>
          <h2>Occupied</h2>
          <p>Next slot: 4:00 PM</p>
          <button className="btn btn-outline btn-sm" disabled>
            Booked
          </button>
        </div>

        <div className="card stat">
          <h3>Gym</h3>
          <h2>Available</h2>
          <p>24/7 Access</p>
          <button className="btn btn-primary btn-sm">Book Now</button>
        </div>

        <div className="card stat">
          <h3>Tennis Court</h3>
          <h2>Maintenance</h2>
          <p>Available tomorrow</p>
          <button className="btn btn-outline btn-sm" disabled>
            Unavailable
          </button>
        </div>
      </section>

      {/* Booking Schedule */}
      <section className="grid grid-2">
        <div className="card compact">
          <div className="card-header">
            <h3>Today's Bookings</h3>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate("/bookings")}
            >
              View Calendar
            </button>
          </div>

          <ul className="list">
            <li>Clubhouse - Birthday Party (2:00 PM - 6:00 PM)</li>
            <li>Swimming Pool - Regular Slot (10:00 AM - 12:00 PM)</li>
            <li>Gym - Personal Training (7:00 PM - 8:00 PM)</li>
          </ul>
        </div>

        <div className="card compact">
          <div className="card-header">
            <h3>My Upcoming Bookings</h3>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate("/my-bookings")}
            >
              View All
            </button>
          </div>

          <ul className="list">
            <li>Gym - Friday, 7:00 AM</li>
            <li>Clubhouse - Sunday, 3:00 PM</li>
            <li>Tennis Court - Monday, 6:00 PM</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Facilities;

