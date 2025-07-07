"use client";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/texture.png')] bg-cover bg-center px-4">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg max-w-md w-full p-8 space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-6xl">🛍️</span>
                    <h1 className="text-5xl font-extrabold text-blue-900 font-logo tracking-wide">
                        ShopSavvy
                    </h1>
                </div>
                <p className="text-center text-gray-600 text-sm">Your smart way to shop better</p>
                {children}
            </div>
        </div>
    );
}
