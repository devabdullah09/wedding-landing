"use client";
import { useEffect, useState } from "react";

const mockEvents = Array(8).fill({
  wwwId: "TK91513",
  date: "6/3/2025",
  status: "Planned",
  gallery: true,
  rsvp: true,
});

export default function EventsListPage() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    wwwId: "",
    date: "",
    status: "Planned",
    gallery: false,
    rsvp: false,
  });

  useEffect(() => {
    const auth = localStorage.getItem("vesello_auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      setUser(parsed);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex-1 p-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-black">EVENTS LIST</h1>
        <button
          className="bg-gradient-to-r from-[#E5B574] via-[#D59C58] to-[#C18037] text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-[#D59C58] hover:to-[#E5B574] transition-colors"
          onClick={() => setShowModal(true)}
        >
          Add Event
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-4">
        <input className="border rounded px-3 py-2" placeholder="Enter WWW ID..." />
        <input className="border rounded px-3 py-2" placeholder="Enter Date" />
        <input className="border rounded px-3 py-2" placeholder="Enter Status..." />
        <input className="border rounded px-3 py-2" placeholder="Enter Gallery..." />
        <input className="border rounded px-3 py-2" placeholder="Enter RSVP..." />
      </div>
      <button className="mb-6 bg-gray-400 text-white px-6 py-2 rounded">Clear Filters</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">WWW ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">DATE</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">GALLERY</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">RSVP</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((event, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{event.wwwId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{event.gallery ? <input type="checkbox" checked readOnly /> : null}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{event.rsvp ? <span role="img" aria-label="rsvp">📷</span> : null}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 font-semibold mr-4">Edit</button>
                  <button className="text-red-500 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">WWW ID</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  value={form.wwwId}
                  onChange={e => setForm(f => ({ ...f, wwwId: e.target.value }))}
                  placeholder="Enter WWW ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Date</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="Planned">Planned</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={form.gallery}
                    onChange={e => setForm(f => ({ ...f, gallery: e.target.checked }))}
                  />
                  Enable Gallery Module
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={form.rsvp}
                    onChange={e => setForm(f => ({ ...f, rsvp: e.target.checked }))}
                  />
                  Enable RSVP Module
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#6C63FF] text-white font-semibold hover:bg-[#554ee0]"
                  onClick={e => { e.preventDefault(); setShowModal(false); }}
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 