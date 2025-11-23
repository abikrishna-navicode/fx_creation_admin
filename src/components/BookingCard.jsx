import React from "react";

export default function BookingCard({ booking, onChangeStatus, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3">
        <img src={booking.image} alt={booking.name} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-lg font-semibold">{booking.name}</h3>

      <div className="mt-1 text-sm text-gray-600">Service: <span className="font-medium">{booking.serviceType}</span></div>
      <div className="mt-1 text-sm text-gray-600">Price: <span className="font-medium">USD {booking.price}</span></div>

      <div className="mt-2 text-sm text-gray-600">
        <span className="mr-3"><strong>Date:</strong> {booking.date}</span>
        <span><strong>Time:</strong> {booking.time}</span>
      </div>

      <div className="mt-3 flex gap-2">
        <select
          value={booking.status}
          onChange={(e) => onChangeStatus(booking.id, e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        >
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
        </select>

        <button
          onClick={() => onDelete(booking.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
