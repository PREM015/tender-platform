// TenderCard.js - placeholder
"use client";

import Link from "next/link";

export default function TenderCard({ tender }) {
  return (
    <div className="border p-4 rounded hover:shadow transition">
      <h3 className="font-semibold text-lg">{tender.title}</h3>
      <p>💰 Budget: ₹{tender.budget}</p>
      <p>🕒 Deadline: {tender.deadline}</p>

      <Link
        href={`/tenders/${tender.id}`}
        className="text-blue-600 underline inline-block mt-2"
      >
        View Details
      </Link>
    </div>
  );
}
