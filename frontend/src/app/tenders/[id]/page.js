// page.js - placeholder
"use client";

import { useEffect, useState } from "react";

export default function TenderDetailPage({ params }) {
  const [tender, setTender] = useState(null);

  const dummyTender = {
    title: "Website Development",
    category: "Software Services",
    budget: 50000,
    deadline: "2025-08-10",
    description: "Need a responsive and SEO-friendly website for a logistics company.",
    postedBy: "Raj Pvt Ltd",
  };

  // 👇 Later this will fetch data from backend using params.id
  useEffect(() => {
    setTender(dummyTender); // Simulate fetch
  }, [params.id]);

  if (!tender) return <p className="p-8">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{tender.title}</h1>
      <p className="text-gray-500 mb-6">Posted by {tender.postedBy}</p>

      <div className="space-y-2 mb-6">
        <p><strong>Category:</strong> {tender.category}</p>
        <p><strong>Budget:</strong> ₹{tender.budget}</p>
        <p><strong>Deadline:</strong> {tender.deadline}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-1">Description</h2>
        <p className="text-gray-700">{tender.description}</p>
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        onClick={() => alert("Apply flow will be added soon")}
      >
        Apply Now
      </button>
    </div>
  );
}
