"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <Link href="/dashboard" className="text-xl font-bold">
        🏗️ TenderPlatform
      </Link>

      <div className="flex gap-4 items-center text-sm">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/tenders/new" className="hover:underline">Create Tender</Link>
        <Link href="/company" className="hover:underline">Company</Link>
        <Link href="/applications" className="hover:underline">Applications</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>
        <Link href="/search/companies" className="hover:underline">Company Search</Link>
        <Link href="/search/tenders" className="hover:underline">Tender Search</Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
