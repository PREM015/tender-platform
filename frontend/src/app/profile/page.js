// page.js - placeholder
"use client";

import useAuth from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth({ protect: true });

  if (!user) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">👤 My Profile</h1>

      <div className="bg-white text-black p-6 rounded shadow">
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>

        <p className="mb-6">
          <strong>User ID:</strong> {user.id || "Not available"}
        </p>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
