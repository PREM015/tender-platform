"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyToTenderPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    expectedBudget: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");

    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tenderId: id,
          message: form.message,
          expectedBudget: form.expectedBudget,
          resumeURL: "https://example.com/resume.pdf", 
        }),
      });

      if (!res.ok) throw new Error("Failed to apply");

      alert("✅ Application submitted!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📝 Apply for Tender #{id}</h1>

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
          name="message"
          placeholder="Your proposal / cover letter"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <input
          type="number"
          name="expectedBudget"
          placeholder="Expected Budget (₹)"
          value={form.expectedBudget}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
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
