"use client";
import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-4 shadow-md">
      <h1 className="text-2xl font-extrabold text-blue-900 font-logo tracking-wide">
        ShopSavvy
      </h1>
      <div className="flex items-center space-x-4">
        <Link href="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link href="/cart" className="text-gray-700 hover:text-blue-600">Shopping Cart</Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600">Logout</Link>
        <Link href="/profile" className="text-gray-700 hover:text-blue-600">My Profile</Link>
      </div>
    </div>
  );
}
