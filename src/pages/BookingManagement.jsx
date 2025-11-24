import React, { useState } from "react";
import "../styles/BookingManagement.css";
import { FiCalendar, FiBell, FiEye, FiPlus } from "react-icons/fi";

import BookingCard from "../components/BookingCard";
import NewAdvertiseModal from "../components/NewAdvertiseModal";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filtered =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="booking-container">
      <div className="booking-header">
        <div className="calendar-box">
          <FiCalendar size={20} />
          <span>Select Date</span>
        </div>

        <div className="booking-actions">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell size={22} />
            <span className="badge">3</span>
          </button>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            <FiPlus size={20} /> Add New Advertise
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["all", "pending", "confirmed", "completed"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Card list */}
      {filtered.length === 0 ? (
        <div className="empty-view">No bookings yet. Add one!</div>
      ) : (
        <div className="card-list">
          {filtered.map((booking, i) => (
            <BookingCard key={i} booking={booking} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && <NewAdvertiseModal onClose={() => setShowModal(false)} />}

      {/* Notifications */}
      {showNotifications && (
        <div className="notification-panel">
          <h3>Notifications</h3>
          <ul>
            <li>New booking received</li>
            <li>Payment confirmed</li>
            <li>User updated booking details</li>
          </ul>
        </div>
      )}
    </div>
  ); // ← REQUIRED CLOSE OF RETURN
} // ← CLOSE COMPONENT
