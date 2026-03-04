import { useNavigate } from "react-router-dom";

function Flat() {
  const navigate = useNavigate();
  
  // Flat-specific data (not profile data)
  const flatData = {
    flatNumber: "A-101",
    block: "A",
    floor: "2nd",
    area: "450 sq.ft.",
    type: "3 BHK",
    maintenance: "₹5,200",
    owner: "Rajesh Kumar",
    occupants: 4,
    adults: 2,
    children: 2,
    parking: "2 Wheeler - P12, 4 Wheeler - G45"
  };

  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>My Flat</h1>
          <p>Details of the flat</p>
        </div>

        {/* Header buttons removed - no Add Member, View All Residents, View Documents */}
      </section>

      <section className="grid grid-4">
        <div className="card stat">
          <h3>Flat Number</h3>
          <h2>{flatData.flatNumber}</h2>
          <p>Block {flatData.block}, {flatData.floor} Floor</p>
        </div>

        <div className="card stat">
          <h3>Area</h3>
          <h2>{flatData.area}</h2>
          <p>{flatData.type}</p>
        </div>

        <div className="card stat">
          <h3>Monthly Maintenance</h3>
          <h2>{flatData.maintenance}</h2>
          <p>Due on 10th every month</p>
        </div>

        <div className="card stat">
          <h3>Occupancy</h3>
          <h2>{flatData.occupants} Members</h2>
          <p>{flatData.adults} Adults, {flatData.children} Children</p>
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card compact">
          <div className="card-header">
            <h3>Family Members</h3>
            {/* Manage button removed */}
          </div>
          <ul className="list">
            <li>{flatData.owner} (Owner)</li>
            <li>Jane Kumar (Spouse)</li>
            <li>Emily Kumar (Daughter)</li>
            <li>Anil Kumar (Son)</li>
          </ul>
          {/* Browse All Residents button removed */}
        </div>

        <div className="card compact">
          <div className="card-header">
            <h3>Important Documents</h3>
            {/* View All button removed */}
          </div>
          <ul className="list">
            <li>Sale Deed</li>
            <li>Maintenance Receipts</li>
            <li>Utility Bills</li>
            <li>NOC Certificates</li>
          </ul>
          {/* View All Documents button removed */}
        </div>
      </section>

      <section>
        <div className="card">
          <div className="card-header">
            <h3>Recent Maintenance Payments</h3>
            {/* Compare with Neighbors and Full History buttons removed */}
          </div>
          <div className="list">
            <div className="list-item">
              <span>January 2024</span>
              <span>{flatData.maintenance}</span>
              <span className="status-paid">Paid</span>
            </div>
            <div className="list-item">
              <span>December 2023</span>
              <span>{flatData.maintenance}</span>
              <span className="status-paid">Paid</span>
            </div>
            <div className="list-item">
              <span>November 2023</span>
              <span>{flatData.maintenance}</span>
              <span className="status-paid">Paid</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Flat;