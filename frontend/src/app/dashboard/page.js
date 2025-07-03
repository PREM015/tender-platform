"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Dummy tenders list for now
    setTenders([
      {
        id: "1",
        title: "Logo Design Needed",
        budget: 20000,
        deadline: "2025-08-05",
      },
      {
        id: "2",
        title: "E-Commerce Website",
        budget: 75000,
        deadline: "2025-08-20",
      },
    ]);
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        👋 Welcome, {user ? user.email : "Guest"}
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-900 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">📦 Tenders Posted</h2>
          <p className="text-3xl">{tenders.length}</p>
        </div>
        <div className="bg-green-100 text-green-900 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">🎯 Applications Received</h2>
          <p className="text-3xl">0</p>
        </div>
      </div>

      <button
        onClick={() => router.push("/tenders/new")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        ➕ Create New Tender
      </button>

      <h2 className="text-xl font-semibold mb-2">📋 Your Tenders</h2>

      <div className="space-y-4">
        {tenders.map((tender) => (
          <div
            key={tender.id}
            className="border p-4 rounded hover:shadow transition"
          >
            <h3 className="font-semibold text-lg">{tender.title}</h3>
            <p>Budget: ₹{tender.budget}</p>
            <p>Deadline: {tender.deadline}</p>
            <a
              href={`/tenders/${tender.id}`}
              className="text-blue-600 underline inline-block mt-1"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
