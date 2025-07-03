// page.js - placeholder
"use client";

import { useState } from "react";

export default function NewTenderPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    budget: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // later we'll connect this to backend with fetch()
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">📝 Create New Tender</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-xl border">
        <input
          type="text"
          name="title"
          placeholder="Tender Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget (INR)"
          value={form.budget}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Tender Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Tender
        </button>
      </form>
    </div>
  );
}
