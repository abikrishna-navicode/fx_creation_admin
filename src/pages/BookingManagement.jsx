import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import BookingCard from "../components/BookingCard";
import NewAdvertiseModal from "../components/NewAdvertiseModal";
import NotificationPanel from "../components/NotificationPanel";
import ResponsesModal from "../components/ResponsesModal";

// Replace this with uploaded sample image path from conversation
const sampleImage = "/mnt/data/4579d505-89d5-46be-8f08-39549e52a5c8.png";

/* initial bookings */
const initialBookings = [
  {
    id: 1,
    image: sampleImage,
    name: "Birthday",
    contact: "0771234567",
    price: 120,
    serviceType: "Camera",
    date: "2025-09-25",
    time: "14:30",
    status: "Pending",
  },
  {
    id: 2,
    image: sampleImage,
    name: "Tamil Wedding",
    contact: "0779876543",
    price: 600,
    serviceType: "Makeup",
    date: "2025-09-28",
    time: "10:00",
    status: "Confirmed",
  },
  {
    id: 3,
    image: sampleImage,
    name: "Vehicle Promo",
    contact: "0775551234",
    price: 250,
    serviceType: "Vehicle",
    date: "2025-10-05",
    time: "09:00",
    status: "Completed",
  },
];

function formatDateToISO(d) {
  if (!d) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isResponsesOpen, setIsResponsesOpen] = useState(false);

  const responsesCount = bookings.length;
  const selectedDateStr = formatDateToISO(selectedDate);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (filter !== "All" && b.status !== filter) return false;
      if (selectedDateStr && b.date !== selectedDateStr) return false;
      return true;
    });
  }, [bookings, filter, selectedDateStr]);

  function updateStatus(id, status) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function deleteBooking(id) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  function addBooking(newBooking) {
    setBookings((prev) => [newBooking, ...prev]);
  }

  function displayHeadingDate() {
    return selectedDateStr || "";
  }

  return (
    <div className="p-6">
      {/* Top header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-6">
          <div className="flex items-center gap-4 bg-white shadow rounded px-4 py-3 cursor-pointer"
               onClick={() => setIsResponsesOpen(true)}
               title="View responses">
            <div className="flex items-center">
              <div className="text-3xl font-semibold text-orange-500">{responsesCount}</div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Responses</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold">
              Bookings on {displayHeadingDate()}
            </h2>
            <div className="mt-2 flex gap-2">
              {["All", "Pending", "Confirmed", "Completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded ${filter === f ? "bg-orange-500 text-white" : "bg-white border shadow-sm"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen((v) => !v)}
              className="flex items-center gap-2 bg-white shadow px-3 py-2 rounded"
              title="Notifications"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
              </svg>
              <span className="text-sm">Notifications</span>
              <span className="ml-1 inline-block bg-red-500 text-white text-xs rounded-full px-2">3</span>
            </button>

            {isNotifOpen && <NotificationPanel onClose={() => setIsNotifOpen(false)} />}
          </div>

          <button
            onClick={() => setIsNewOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md shadow"
          >
            + New Advertise
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: table (spans 2 columns on large screens) */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded">
            <div className="p-4 border-b">
              <h3 className="text-sm font-semibold text-gray-700">Bookings</h3>
            </div>

            <div className="p-4">
              {/* If no bookings at all show empty view */}
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-2xl text-gray-400 mb-4">No bookings yet. Add one!</div>
                  <button onClick={() => setIsNewOpen(true)} className="px-4 py-2 bg-orange-500 text-white rounded">
                    + New Advertise
                  </button>
                </div>
              ) : (
                <>
                  {/* Table view */}
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="text-left bg-gray-50 text-sm text-gray-700">
                          <th className="p-3 border">Name</th>
                          <th className="p-3 border">Contact</th>
                          <th className="p-3 border">Type</th>
                          <th className="p-3 border">Date</th>
                          <th className="p-3 border">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-6 text-center text-gray-500">
                              No bookings for this date and status.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => (
                            <tr key={b.id} className="border-b align-top">
                              <td className="p-3 flex items-center gap-3">
                                <img src={b.image} alt={b.name} className="h-12 w-20 object-cover rounded" />
                                <div>
                                  <div className="font-medium">{b.name}</div>
                                  <div className="text-xs text-gray-500">{b.time}</div>
                                </div>
                              </td>

                              <td className="p-3 text-sm">{b.contact}</td>
                              <td className="p-3 text-sm">{b.serviceType}</td>
                              <td className="p-3 text-sm">{b.date}</td>
                              <td className="p-3 text-sm">
                                <select
                                  value={b.status}
                                  onChange={(e) => updateStatus(b.id, e.target.value)}
                                  className="border rounded px-2 py-1"
                                >
                                  <option>Pending</option>
                                  <option>Confirmed</option>
                                  <option>Completed</option>
                                </select>
                                <button
                                  onClick={() => deleteBooking(b.id)}
                                  className="ml-3 text-xs text-red-600"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Card Grid below table to match screenshot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBookings.map((b) => (
                      <BookingCard
                        key={b.id}
                        booking={b}
                        onChangeStatus={updateStatus}
                        onDelete={deleteBooking}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: calendar */}
        <div className="w-full">
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Calendar</h4>
              <div className="text-xs text-gray-500">November 2025</div>
            </div>

            <div>
              <Calendar
                onChange={(d) => {
                  const date = Array.isArray(d) ? d[0] : d;
                  setSelectedDate(date);
                }}
                value={selectedDate}
                className="react-calendar-custom w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlays */}
      {isResponsesOpen && (
        <ResponsesModal
          bookings={bookings}
          onClose={() => setIsResponsesOpen(false)}
          onChangeStatus={updateStatus}
        />
      )}

      {isNewOpen && (
        <NewAdvertiseModal
          isOpen={isNewOpen}
          onClose={() => setIsNewOpen(false)}
          onSubmit={addBooking}
        />
      )}
    </div>
  );
}
