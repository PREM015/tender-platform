"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyPage() {
  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    description: "",
    logo_url: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch existing company profile
  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Company not found");
        setIsEditing(true);
        return res.json();
      })
      .then((data) => {
        setForm({
          company_name: data.company_name || "",
          industry: data.industry || "",
          description: data.description || "",
          logo_url: data.logo_url || "",
        });
      })
      .catch(() => {
        setIsEditing(false);
      });
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo upload
  const uploadLogo = async () => {
    if (!logoFile) return null;
    const filePath = `logos/${Date.now()}-${logoFile.name}`;
    const { error } = await supabase.storage
      .from("logos")
      .upload(filePath, logoFile, { upsert: false });
    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("logos").getPublicUrl(filePath);
    return publicUrl;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let logoUrl = form.logo_url;
      if (logoFile) {
        logoUrl = await uploadLogo();
      }

      const payload = { ...form, logo_url: logoUrl };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company${isEditing ? "/me" : ""}`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setMessage(res.ok ? "✅ Saved!" : `❌ ${data.message}`);
      if (res.ok) setForm((prev) => ({ ...prev, logo_url: logoUrl }));
    } catch (err) {
      setMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🏢 Company Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="company_name"
          placeholder="Company Name"
          value={form.company_name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          className="block"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : isEditing ? "Update Profile" : "Create Profile"}
        </button>
      </form>

      {form.logo_url && (
        <img
          src={form.logo_url}
          alt="Logo"
          className="mt-4 max-h-32 border rounded"
        />
      )}

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
