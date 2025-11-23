import React, { useMemo, useState } from "react";

export default function ResponsesModal({ bookings, onClose, onChangeStatus }) {
  const [tab, setTab] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (tab !== "All" && b.status !== tab) return false;
      if (dateFilter && b.date !== dateFilter) return false;
      return true;
    });
  }, [bookings, tab, dateFilter]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <div className="text-3xl font-semibold text-orange-500">
              {bookings.length}
            </div>
            <p className="text-sm text-gray-500">Responses</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-3 px-6 py-3">
          {["All", "Pending", "Confirmed", "Completed"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium border 
                ${tab === t
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white border-gray-300 text-gray-600"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="px-6 pb-6 w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 text-sm">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Contact</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500"
                  >
                    No bookings for this date and status.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="border-b text-sm">
                    <td className="p-3">{b.name}</td>
                    <td className="p-3">{b.contact}</td>
                    <td className="p-3">{b.serviceType}</td>
                    <td className="p-3">{b.date}</td>

                    <td className="p-3">
                      <select
                        value={b.status}
                        onChange={(e) => onChangeStatus(b.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
