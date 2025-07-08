"use client";
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/useAuth';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("Please login to get access!");
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return children;
}
