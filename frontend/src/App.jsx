import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Announcements from "./pages/Announcements";
import Notifications from "./pages/Notifications";

import MaintenanceBills from "./pages/MaintenanceBills";
import Complaints from "./pages/Complaints";
import Bookings from "./pages/Bookings";

import Users from "./pages/Users";
import Flats from "./pages/Flats";
import Facilities from "./pages/Facilities";

import NotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("resident");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a function to handle auth check
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");
    
      if (token && userData) {
        // Set both states at once to minimize renders
        setIsLoggedIn(true);
        const user = JSON.parse(userData);
        setRole(user.role || "resident");
      }
      setLoading(false);
    };
  
    checkAuth();
  }, []);

  // Handle login (to be called from Login page)
  const handleLogin = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setRole(userData.role || "resident");
  };

  // Handle logout (to be called from Layout)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setRole("resident");
  };

  // Loading state
  if (loading) {
    return (
      <div className="auth-page">
        <div className="card auth-card">
          <div className="auth-title">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login or dashboard based on auth */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes - only if logged in */}
        {isLoggedIn ? (
          <Route element={<Layout role={role} onLogout={handleLogout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/maintenance" element={<MaintenanceBills />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/bookings" element={<Bookings />} />

            <Route path="/users" element={<Users />} />
            <Route path="/flats" element={<Flats />} />
            <Route path="/facilities" element={<Facilities />} />
          </Route>
        ) : (
          // If not logged in, protect all dashboard routes
          <Route path="/*" element={<Navigate to="/login" />} />
        )}

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;