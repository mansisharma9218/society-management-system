# Society Management System 

## Overview

The Society Management System is a web-based application developed to digitize and streamline the daily operations of residential societies. This system eliminates manual record-keeping and communication delays by providing a centralized digital platform where all society-related activities can be managed efficiently.

## Live Deployment

- **Frontend:** [society-management-system](https://github.com/mansisharma9218/society-management-system)
- **Backend:** [ResiFlowBackend](https://github.com/KarthikeyanKS00747/ResiFlowBackend) — hosted on **Render**
- **Database:** **MongoDB Atlas**

> The backend is hosted on Render and must be running for the frontend to function. No local backend setup is required unless you're developing offline.

---

## Objectives

- Automate routine society management tasks.
- Reduce manual effort and paperwork.
- Improve communication between residents and administrators.
- Provide a secure and centralized data management system.
- Enhance transparency in billing, payments, and complaint resolution.

---

## Key Features

### 1. User Registration and Secure Login
Residents and administrators can register and log in securely. Authentication mechanisms ensure only authorized users can access the platform.

### 2. Role-Based Access Control

**Admin Dashboard**
- Manage residents and user accounts.
- Generate maintenance bills.
- Track payments.
- Handle complaints.
- Post announcements.
- Approve or reject facility bookings.
- View system reports.

**Resident Dashboard**
- View and pay maintenance bills.
- Track payment history.
- Register complaints and monitor their status.
- Book society halls or shared facilities.
- Receive notifications and announcements.
- Update personal profile details.

### 3. Maintenance Bill Generation and Payment Tracking
Admins can automatically calculate maintenance charges and generate bills. Full payment history is maintained for both admins and residents.

### 4. Online Complaint Registration and Tracking
Residents can submit complaints through the portal. Admins can review, assign, and update complaint statuses for faster resolution.

### 5. Hall and Facility Booking System
Easy-to-use booking interface for common facilities with admin approval workflows to prevent scheduling conflicts.

### 6. Notification and Announcement System
Admins can broadcast notices, meeting updates, maintenance schedules, and emergency alerts directly to all residents.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript, React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Hosting (Backend) | Render |

---

## Running the Frontend Locally

The backend is already deployed on Render — you only need to set up the frontend locally.

### Prerequisites

- Node.js installed
- npm or yarn package manager

### Steps

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/mansisharma9218/society-management-system.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd society-management-system
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:
   Create a `.env` file and point the API URL to the hosted backend:
   ```
   REACT_APP_API_URL=https://<your-render-backend-url>
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and visit:
   ```
   http://localhost:5000
   ```

---

## Running the Backend Locally (Optional)

Only needed if you want to run the backend offline or contribute to it.

### Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Steps

1. Clone the backend repository:
   ```bash
   git clone https://github.com/KarthikeyanKS00747/ResiFlowBackend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ResiFlowBackend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

---

## Benefits

- Minimizes paperwork and manual errors.
- Saves time for both administrators and residents.
- Provides real-time updates and communication.
- Ensures secure handling of society data.
- Improves operational efficiency.
- Creates a transparent financial system.
