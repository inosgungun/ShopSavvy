"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-md">
      <h1 className="text-xl font-semibold">ShopSavvy</h1>
      <div className="space-x-4">
        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link href="/cart" className="text-gray-700 hover:text-blue-600">Shopping Cart</Link>
        {user ? (
          <>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">My Profile</Link>
            <button 
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        )}
      </div>
    </div>
  );
}
