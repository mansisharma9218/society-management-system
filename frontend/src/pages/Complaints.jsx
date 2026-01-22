function Complaints() {
  return (
    <div className="page">
      <section className="page-header dashboard-header">
        <div>
          <h1>Complaints</h1>
          <p>Register a new issue or track the status of existing ones.</p>
        </div>
      </section>

      <div className="grid grid-2">
        {/* New Complaint Form */}
        <section className="card">
          <div className="card-header">
            <h3>Raise New Complaint</h3>
          </div>
          
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="input">
                <option value="" disabled selected>Select a category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="security">Security</option>
                <option value="cleaning">Cleaning</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label">Issue Description</label>
              <textarea 
                className="input" 
                rows="6" 
                placeholder="Briefly describe the problem..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Submit Complaint
            </button>
          </form>
        </section>

        {/* Status Tracker */}
        <section className="card">
          <div className="card-header">
            <h3>Complaint History</h3>
          </div>

          <div className="nav">
            <div className="card compact">
              <div className="card-header">
                <h3>Main Gate Light</h3>
                <span className="label">In Progress</span>
              </div>
              <p>The street light near the main gate is flickering since last night.</p>
            </div>

            <div className="nav-divider" />

            <div className="card compact">
              <div className="card-header">
                <h3>Kitchen Sink Leak</h3>
                <span className="label">Resolved</span>
              </div>
              <p>The plumbing team fixed the leakage in Flat C-405.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Complaints;