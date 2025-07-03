// page.js - placeholder
"use client";

import { useEffect, useState } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Dummy tender list
    const dummyTenders = [
        {
            id: "1",
            title: "Web Development Project",
            category: "Software",
            budget: 60000,
            deadline: "2025-08-10",
        },
        {
            id: "2",
            title: "Construction Work",
            category: "Civil",
            budget: 150000,
            deadline: "2025-09-01",
        },
        {
            id: "3",
            title: "App UI Design",
            category: "Design",
            budget: 25000,
            deadline: "2025-08-20",
        },
    ];

    const handleSearch = () => {
        if (!query) return setResults(dummyTenders);

        const filtered = dummyTenders.filter((t) =>
            t.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    };

    useEffect(() => {
        handleSearch(); // Load all initially
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">🔍 Search Tenders</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search by title or keyword"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border p-2 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            <div className="space-y-4">
                {results.length === 0 ? (
                    <p>No tenders found.</p>
                ) : (
                    results.map((tender) => (
                        <div
                            key={tender.id}
                            className="border rounded p-4 shadow-sm hover:shadow transition"
                        >
                            <h2 className="text-lg font-semibold">{tender.title}</h2>
                            <p className="text-gray-600">Category: {tender.category}</p>
                            <p className="text-gray-600">Budget: ₹{tender.budget}</p>
                            <p className="text-gray-600">Deadline: {tender.deadline}</p>
                            <a
                                href={`/tenders/${tender.id}`}
                                className="text-blue-600 underline mt-2 inline-block"
                            >
                                View Details
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
