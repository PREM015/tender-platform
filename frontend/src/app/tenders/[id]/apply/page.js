"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ApplyToTender() {
    const params = useParams(); // gets tender ID from URL
    const [form, setForm] = useState({
        name: "",
        email: "",
        coverLetter: "",
        resume: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
            setForm({ ...form, resume: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Applying to Tender ID:", params.id);
        console.log("Application Data:", form);

        // Later, send to backend via FormData + token
        alert("✅ Application submitted (mock)");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">🧾 Apply to Tender</h1>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow border">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <textarea
                    name="coverLetter"
                    placeholder="Why are you a good fit?"
                    value={form.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
}
