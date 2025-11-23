import React from "react";

const sampleNotifications = [
  { id: 1, text: "New booking from John Doe", time: "2m ago" },
  { id: 2, text: "Booking confirmed: Tamil Wedding", time: "1h ago" },
  { id: 3, text: "Payment received for Birthday", time: "1d ago" },
];

export default function NotificationPanel({ onClose }) {
  return (
    <div className="absolute right-6 top-16 w-80 bg-white shadow rounded p-3 z-40">
      <div className="flex justify-between items-center mb-2">
        <strong>Notifications</strong>
        <button onClick={onClose} className="text-sm text-gray-500">Close</button>
      </div>

      <div className="divide-y">
        {sampleNotifications.map((n) => (
          <div key={n.id} className="py-2 text-sm">
            <div className="font-medium">{n.text}</div>
            <div className="text-xs text-gray-500">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
