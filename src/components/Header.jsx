"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/useAuth";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-between items-center p-4 shadow-md">
        <h1 className="text-xl font-semibold">ShopSavvy</h1>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600">Shopping Cart</Link>
          <span className="text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

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
