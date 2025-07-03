"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to view your applications.");

    const fetchApps = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) return <div className="p-8">Loading applications...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📋 My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any tenders yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id || app.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold mb-1">
                🧾 {app.tenderTitle || "Untitled Tender"}
              </h2>
              <p className="mb-1">💰 Budget: ₹{app.expectedBudget}</p>
              <p className="mb-1">✍️ Message: {app.message}</p>

              <button
                onClick={() => router.push(`/tenders/${app.tenderId}`)}
                className="text-blue-600 underline mt-2 inline-block"
              >
                View Tender
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
