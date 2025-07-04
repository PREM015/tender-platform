"use client";
import { useState } from "react";

export default function TenderSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await fetch(`http://localhost:5000/api/search/tenders?q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Tender Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or description"
        className="border p-2 rounded w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded">
        Search
      </button>

      <div className="mt-6 space-y-4">
        {results.map((t) => (
          <div key={t.id} className="border p-3 rounded shadow">
            <h3 className="font-semibold text-lg">{t.title}</h3>
            <p className="text-gray-600">Budget: ₹{t.budget}</p>
            <p className="text-sm">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
