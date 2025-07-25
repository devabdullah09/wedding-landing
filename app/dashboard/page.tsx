"use client";

const dashboardStats = [
  { label: "Total Events", value: 25, bg: "bg-blue-100", text: "text-blue-900" },
  { label: "Active Events", value: 7, bg: "bg-green-100", text: "text-green-900" },
  { label: "Photos Uploaded", value: 135, bg: "bg-purple-100", text: "text-purple-900" },
  { label: "RSVP Pending", value: 48, bg: "bg-yellow-100", text: "text-yellow-900" },
];

const recentActivity = [
  { text: <><b>Tom & Emma</b> event created on June, 2025</> },
  { text: <><b>Jane Smith</b> RSVP with 2 guests for Greg & Aneta Wedding</> },
  { text: <>Image added to Emma’s Wedding Gallery</> },
  { text: <><b>Tom & Emma</b> event created on June, 2025</> },
  { text: <><b>Jane Smith</b> RSVP with 2 guests for Greg & Aneta Wedding</> },
  { text: <>Image added to Emma’s Wedding Gallery</> },
];

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-xl font-semibold text-[#6B3F0B] mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map(stat => (
          <div key={stat.label} className={`rounded-lg p-6 ${stat.bg} ${stat.text} shadow-sm`}>
            <div className="text-sm font-medium mb-1 opacity-80">{stat.label}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#6B3F0B] mb-3">Recent Activity</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <ul className="space-y-2">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="text-base text-gray-800">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
} 