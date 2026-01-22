import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MaintenanceBills() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [selectedBill, setSelectedBill] = useState(null);
  const [role, setRole] = useState("resident");
  const [bills, setBills] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  // Initialize auth and fetch bills
  useEffect(() => {
    const initializeData = () => {
      const userData = localStorage.getItem("user");
      let userRole = "resident";
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          userRole = user.role || "resident";
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
      
      setRole(userRole);
      
      // Sample data - replace with API calls
      if (userRole === "admin") {
        // Admin sees all society bills
        const adminBills = [
          {
            id: "BILL-2024-001",
            month: "January 2024",
            amount: 4500,
            dueDate: "Jan 15, 2024",
            status: "paid",
            paidDate: "Jan 10, 2024",
            transactionId: "TXN123456789",
            flat: "B-203",
            resident: "John Doe",
            contact: "john@email.com",
            details: "Monthly maintenance including water, security, and common area maintenance"
          },
          {
            id: "BILL-2024-002",
            month: "February 2024",
            amount: 4500,
            dueDate: "Feb 15, 2024",
            status: "pending",
            paidDate: null,
            transactionId: null,
            flat: "A-101",
            resident: "Jane Smith",
            contact: "jane@email.com",
            details: "Monthly maintenance including water, security, and common area maintenance"
          },
          {
            id: "BILL-2024-003",
            month: "March 2024",
            amount: 5000,
            dueDate: "Mar 15, 2024",
            status: "overdue",
            paidDate: null,
            transactionId: null,
            flat: "C-305",
            resident: "Robert Johnson",
            contact: "robert@email.com",
            details: "Monthly maintenance + ₹500 special assessment for lift maintenance"
          },
          {
            id: "BILL-2024-004",
            month: "January 2024",
            amount: 4500,
            dueDate: "Jan 15, 2024",
            status: "paid",
            paidDate: "Jan 12, 2024",
            transactionId: "TXN987654321",
            flat: "D-412",
            resident: "Sarah Williams",
            contact: "sarah@email.com",
            details: "Monthly maintenance including water, security, and common area maintenance"
          }
        ];
        setBills(adminBills);
      } else {
        // Resident sees only their bills
        const residentBills = [
          {
            id: "BILL-2024-001",
            month: "January 2024",
            amount: 4500,
            dueDate: "Jan 15, 2024",
            status: "paid",
            paidDate: "Jan 10, 2024",
            transactionId: "TXN123456789",
            flat: "B-203",
            resident: "Your Flat",
            contact: "your@email.com",
            details: "Monthly maintenance including water, security, and common area maintenance"
          },
          {
            id: "BILL-2024-002",
            month: "February 2024",
            amount: 4500,
            dueDate: "Feb 15, 2024",
            status: "pending",
            paidDate: null,
            transactionId: null,
            flat: "B-203",
            resident: "Your Flat",
            contact: "your@email.com",
            details: "Monthly maintenance including water, security, and common area maintenance"
          },
          {
            id: "BILL-2024-003",
            month: "March 2024",
            amount: 5000,
            dueDate: "Mar 15, 2024",
            status: "overdue",
            paidDate: null,
            transactionId: null,
            flat: "B-203",
            resident: "Your Flat",
            contact: "your@email.com",
            details: "Monthly maintenance + ₹500 special assessment for lift maintenance"
          }
        ];
        setBills(residentBills);
      }
      
      setIsInitialized(true);
    };
    
    initializeData();
  }, []);

  const months = [
    "January 2024", "February 2024", "March 2024", 
    "December 2023", "November 2023", "October 2023"
  ];

  const filteredBills = bills.filter(bill => {
    const statusMatch = filterStatus === "all" || bill.status === filterStatus;
    const monthMatch = filterMonth === "all" || bill.month === filterMonth;
    return statusMatch && monthMatch;
  });

  // Calculate totals
  const calculateTotals = () => {
    const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
    const paidAmount = filteredBills
      .filter(bill => bill.status === "paid")
      .reduce((sum, bill) => sum + bill.amount, 0);
    const pendingAmount = filteredBills
      .filter(bill => bill.status !== "paid")
      .reduce((sum, bill) => sum + bill.amount, 0);
    
    return {
      totalAmount,
      paidAmount,
      pendingAmount,
      paidCount: filteredBills.filter(b => b.status === "paid").length,
      pendingCount: filteredBills.filter(b => b.status !== "paid").length
    };
  };

  const totals = calculateTotals();

  const handlePayNow = (billId) => {
    if (role === "resident") {
      alert(`Initiating payment for bill ${billId}`);
    } else {
      alert(`Admin: View payment details for ${billId}`);
    }
  };

  const handleDownloadInvoice = (billId) => {
    alert(`Downloading invoice for ${billId}`);
  };

  const handleViewDetails = (bill) => {
    setSelectedBill(selectedBill?.id === bill.id ? null : bill);
  };

  const handleGenerateBill = () => {
    alert("Generating new maintenance bill for all flats...");
  };

  const handleSendReminder = (billId, resident) => {
    alert(`Sending payment reminder to ${resident} for bill ${billId}`);
  };

  const handleMarkAsPaid = (billId) => {
    alert(`Marking bill ${billId} as paid manually`);
  };

  const handleSendBulkReminders = () => {
    alert("Sending reminders to all residents with pending payments...");
  };

  const handleExportReport = () => {
    alert("Exporting maintenance report...");
  };

  if (!isInitialized) {
    return (
      <div className="page">
        <div className="card">
          <div className="empty-state">
            <p>Loading maintenance bills...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* HEADER - Different for Admin vs Resident */}
      <section className="page-header dashboard-header">
        <div>
          <h1>Maintenance {role === "admin" ? "Management" : "Bills"}</h1>
          <p className="card-description">
            {role === "admin" 
              ? "Manage society maintenance bills, send reminders, and track payments."
              : "View, pay, and track your maintenance bills. All transactions are recorded and invoices available for download."
            }
          </p>
        </div>

        <div className="header-actions">
          {role === "admin" ? (
            <>
              <button className="btn btn-primary" onClick={handleGenerateBill}>
                Generate Bills
              </button>
              <button className="btn btn-outline" onClick={handleSendBulkReminders}>
                Send Reminders
              </button>
              <button className="btn btn-outline" onClick={handleExportReport}>
                Export Report
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary" onClick={() => handlePayNow("ALL")}>
                Pay All Pending
              </button>
              <button className="btn btn-outline" onClick={() => alert("View Payment History")}>
                Payment History
              </button>
            </>
          )}
        </div>
      </section>

      {/* SUMMARY CARDS - Different Metrics */}
      <section className="grid grid-4">
        {role === "admin" ? (
          <>
            <div className="card stat">
              <h3>Total Revenue</h3>
              <h2>₹{totals.totalAmount.toLocaleString()}</h2>
              <p>This period</p>
            </div>
            <div className="card stat">
              <h3>Collected</h3>
              <h2>₹{totals.paidAmount.toLocaleString()}</h2>
              <p>{totals.paidCount} payments</p>
            </div>
            <div className="card stat">
              <h3>Pending</h3>
              <h2>₹{totals.pendingAmount.toLocaleString()}</h2>
              <p>{totals.pendingCount} pending</p>
            </div>
            <div className="card stat">
              <h3>Collection Rate</h3>
              <h2>{totals.totalAmount > 0 ? Math.round((totals.paidAmount / totals.totalAmount) * 100) : 0}%</h2>
              <p>Payment efficiency</p>
            </div>
          </>
        ) : (
          <>
            <div className="card stat">
              <h3>Total Bills</h3>
              <h2>{bills.length}</h2>
              <p>All time</p>
            </div>
            <div className="card stat" style={{ cursor: "pointer" }} onClick={() => setFilterStatus("pending")}>
              <h3>Amount Due</h3>
              <h2>₹{totals.pendingAmount.toLocaleString()}</h2>
              <p>Payment pending</p>
            </div>
            <div className="card stat">
              <h3>Paid Amount</h3>
              <h2>₹{totals.paidAmount.toLocaleString()}</h2>
              <p>Total cleared</p>
            </div>
            <div className="card stat">
              <h3>On Time Payments</h3>
              <h2>{totals.paidCount}/{bills.length}</h2>
              <p>Payment history</p>
            </div>
          </>
        )}
      </section>

      {/* FILTERS */}
      <div className="card filter-card">
        <h3>Filter Bills</h3>
        <div className="filter-grid">
          <div className="filter-options">
            <div className="form-group">
              <label className="label">Status</label>
              <select 
                className="input"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label">Month</label>
              <select 
                className="input"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="all">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {role === "admin" && (
              <div className="form-group">
                <label className="label">Sort By</label>
                <select className="input" defaultValue="dueDate">
                  <option value="dueDate">Due Date</option>
                  <option value="amount">Amount</option>
                  <option value="flat">Flat Number</option>
                  <option value="status">Status</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BILLS TABLE - Different Columns for Admin vs Resident */}
      <div className="card">
        <div className="card-header">
          <h3>
            {role === "admin" ? "Society Maintenance Bills" : "Your Maintenance Bills"}
          </h3>
          <div className="table-count">
            Showing {filteredBills.length} of {bills.length} bills
          </div>
        </div>

        {filteredBills.length === 0 ? (
          <div className="empty-state">
            <p>No bills found matching your filters.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  {role === "admin" && <th>Flat</th>}
                  {role === "admin" && <th>Resident</th>}
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <>
                    <tr key={bill.id}>
                      <td>
                        <div className="table-primary">{bill.id}</div>
                        {role === "resident" && (
                          <div className="table-secondary">{bill.flat}</div>
                        )}
                      </td>
                      {role === "admin" && (
                        <>
                          <td>
                            <div className="table-primary">{bill.flat}</div>
                          </td>
                          <td>
                            <div className="table-primary">{bill.resident}</div>
                            <div className="table-secondary">{bill.contact}</div>
                          </td>
                        </>
                      )}
                      <td>
                        <div className="table-primary">{bill.month}</div>
                      </td>
                      <td>
                        <div className="table-primary">₹{bill.amount.toLocaleString()}</div>
                      </td>
                      <td>
                        <div className="table-primary">{bill.dueDate}</div>
                        <div className="table-secondary">
                          {bill.status === "paid" ? `Paid on ${bill.paidDate}` : "Due"}
                        </div>
                      </td>
                      <td>
                        <span className={`status-${bill.status}`}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {role === "admin" ? (
                            <>
                              {bill.status !== "paid" && (
                                <>
                                  <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleSendReminder(bill.id, bill.resident)}
                                  >
                                    Remind
                                  </button>
                                  <button 
                                    className="btn btn-outline btn-sm"
                                    onClick={() => handleMarkAsPaid(bill.id)}
                                  >
                                    Mark Paid
                                  </button>
                                </>
                              )}
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => handleViewDetails(bill)}
                              >
                                {selectedBill?.id === bill.id ? "Hide" : "View"}
                              </button>
                            </>
                          ) : (
                            <>
                              {bill.status !== "paid" ? (
                                <button 
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handlePayNow(bill.id)}
                                >
                                  Pay Now
                                </button>
                              ) : (
                                <button 
                                  className="btn btn-outline btn-sm"
                                  onClick={() => handleDownloadInvoice(bill.id)}
                                >
                                  Invoice
                                </button>
                              )}
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => handleViewDetails(bill)}
                              >
                                {selectedBill?.id === bill.id ? "Hide" : "Details"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    {selectedBill?.id === bill.id && (
                      <tr>
                        <td colSpan={role === "admin" ? 8 : 6}>
                          <div style={{ 
                            padding: '16px', 
                            background: 'var(--bg-muted)', 
                            borderRadius: 'var(--radius-sm)',
                            marginTop: '8px'
                          }}>
                            <h4 style={{ marginBottom: '8px' }}>Bill Details</h4>
                            <p style={{ marginBottom: '12px' }}>{bill.details}</p>
                            
                            <div style={{ 
                              display: 'grid', 
                              gridTemplateColumns: role === 'admin' ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', 
                              gap: '16px' 
                            }}>
                              <div>
                                <p className="table-secondary">Bill ID</p>
                                <p>{bill.id}</p>
                              </div>
                              <div>
                                <p className="table-secondary">Month</p>
                                <p>{bill.month}</p>
                              </div>
                              {role === "admin" && (
                                <div>
                                  <p className="table-secondary">Contact</p>
                                  <p>{bill.contact}</p>
                                </div>
                              )}
                              {bill.status === "paid" && (
                                <>
                                  <div>
                                    <p className="table-secondary">Transaction ID</p>
                                    <p>{bill.transactionId}</p>
                                  </div>
                                  <div>
                                    <p className="table-secondary">Payment Date</p>
                                    <p>{bill.paidDate}</p>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            {role === "admin" && bill.status !== "paid" && (
                              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <h5 style={{ marginBottom: '8px' }}>Admin Actions</h5>
                                <div className="action-buttons">
                                  <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleSendReminder(bill.id, bill.resident)}
                                  >
                                    Send Payment Reminder
                                  </button>
                                  <button 
                                    className="btn btn-outline btn-sm"
                                    onClick={() => alert(`Contact ${bill.resident} at ${bill.contact}`)}
                                  >
                                    Contact Resident
                                  </button>
                                  <button 
                                    className="btn btn-outline btn-sm"
                                    onClick={() => handleMarkAsPaid(bill.id)}
                                  >
                                    Mark as Paid Manually
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOOTER SECTION */}
        <div style={{ 
          marginTop: '24px', 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)' 
        }}>
          <h4>
            {role === "admin" ? "Administration Tools" : "Payment Information"}
          </h4>
          <p className="table-secondary" style={{ marginTop: '8px' }}>
            {role === "admin" 
              ? "Use the tools above to manage society maintenance efficiently. Regular reminders improve collection rates."
              : "Payments can be made via UPI, Net Banking, or Credit/Debit Card. All transactions are secured and encrypted."
            }
          </p>
          <div className="action-buttons" style={{ marginTop: '16px' }}>
            {role === "admin" ? (
              <>
                <button className="btn btn-primary" onClick={handleGenerateBill}>
                  Generate Monthly Bills
                </button>
                <button className="btn btn-outline" onClick={handleSendBulkReminders}>
                  Send Bulk Reminders
                </button>
                <button className="btn btn-outline" onClick={handleExportReport}>
                  Export Financial Report
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => alert("View Payment History")}>
                  Payment History
                </button>
                <button className="btn btn-outline" onClick={() => alert("Download All Invoices")}>
                  Download All Invoices
                </button>
                <button className="btn btn-outline" onClick={() => navigate("/complaints")}>
                  Report Payment Issue
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceBills;