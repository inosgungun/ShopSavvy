"use client";
import Link from "next/link";

export default function RootPage() {
  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4">
      <div className="flex flex-col items-center justify-center space-y-2 mb-6">
        <span className="text-6xl">🛍️</span>
        <h1 className="text-5xl font-extrabold text-blue-900 font-logo tracking-wide">
          ShopSavvy
        </h1>
      </div>

      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Discover the smart way to shop — find the best deals and hottest products instantly.
      </p>

      <Link
        href="/login"
        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
      >
        Get Started
      </Link>
    </div>
  
  );
}
