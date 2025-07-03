"use client";

import { useEffect, useState } from "react";

export default function CompanyPage() {
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch existing company profile
  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Company not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          companyName: data.companyName || "",
          industry: data.industry || "",
          description: data.description || "",
        });
      })
      .catch((err) => {
        console.log("No existing profile");
      });
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company`, {
      method: "POST", // can also handle PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Profile saved successfully");
    } else {
      setMessage(`❌ ${data.message || "Failed to save profile"}`);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>🧾 Company Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
