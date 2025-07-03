// page.js - placeholder
"use client";

import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulated fetch – replace with real API call
    setApplications([
      {
        id: "a1",
        name: "John Doe",
        email: "john@example.com",
        tenderTitle: "Logo Design Needed",
        coverLetter:
          "I have 5+ years experience designing brand identities. Check my portfolio at...",
      },
      {
        id: "a2",
        name: "Anita Sharma",
        email: "anita@example.com",
        tenderTitle: "E-Commerce Website",
        coverLetter:
          "Built 20+ scalable web apps for clients. Would love to work on this!",
      },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">📨 Tender Applications</h1>

      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="p-4 border rounded shadow-sm">
              <h2 className="text-lg font-semibold">{app.name}</h2>
              <p className="text-sm text-gray-600">{app.email}</p>
              <p className="mt-1">
                <strong>Applied for:</strong> {app.tenderTitle}
              </p>
              <p className="mt-2 text-gray-700">
                {app.coverLetter.length > 100
                  ? app.coverLetter.slice(0, 100) + "..."
                  : app.coverLetter}
              </p>

              <button
                className="mt-3 inline-block text-blue-600 hover:underline text-sm"
                onClick={() => alert("Full detail view coming soon")}
              >
                View full
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
