// useAuth.js - placeholder
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth({ redirectTo = "/login", protect = false } = {}) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && protect) {
      router.push(redirectTo);
    }

    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data && data.user) {
            setUser(data.user);
          } else if (protect) {
            router.push(redirectTo);
          }
        })
        .catch(() => {
          if (protect) router.push(redirectTo);
        });
    }
  }, [protect, redirectTo]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { user, logout };
}
