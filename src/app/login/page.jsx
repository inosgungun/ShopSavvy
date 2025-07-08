"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthLayout from "@/components/AuthLayout";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/useAuth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      // Login logic
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Logged in successfully!");
        router.push("/home");
      } catch (error) {
        toast.error("Invalid email or password");
      } finally {
        setLoading(false);
      }
    } else {
      // Signup logic
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const newUser = userCredential.user;
        await updateProfile(newUser, { displayName: formData.name });
        router.push("/home");
      } catch (error) {
        toast.error("Invalid format or user already exists");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4">
      <AuthLayout>
        <div className="w-full space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isLogin ? "create a new account" : "sign in to your existing account"}
                </button>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="sr-only">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Full Name"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    placeholder="Password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="Confirm Password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </div>
                  ) : (
                    isLogin ? "Sign in" : "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
