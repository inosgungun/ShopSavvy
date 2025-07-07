"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 shadow-md">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-blue-900 font-logo tracking-wide">
          ShopSavvy
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600">Shopping Cart</Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">Logout</Link>
          <Link href="/profile" className="text-gray-700 hover:text-blue-600">My Profile</Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 pb-4 px-4 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
          <Link href="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600">Shopping Cart</Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">Logout</Link>
          <Link href="/profile" className="text-gray-700 hover:text-blue-600">My Profile</Link>
        </div>
      )}
    </header>
  );
}
