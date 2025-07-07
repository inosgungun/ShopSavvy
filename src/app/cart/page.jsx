"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + ((item.price * (item.discountPercentage || 0) / 100) * (item.quantity || 1)),
    0
  );
  const payAmount = totalPrice - totalDiscount;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4 py-8">


      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <div className="relative flex items-center justify-center mb-6">
          {/* Back arrow only on small screens, positioned to the left */}
          <div className="absolute left-4 md:hidden">
            <button
              onClick={() => router.push("/home")}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <ArrowLeft className="w-6 h-6 mr-1" />
            </button>
          </div>

          {/* Title stays centered */}
          <h1 className="text-2xl font-bold">🛒 Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4 mb-6">
            {cartItems.map((item, index) => {
              const discountedPrice = Math.round(item.price - (item.price * (item.discountPercentage || 0) / 100));
              const quantity = item.quantity || 1;

              return (
                <div key={`${item.id}-${index}`} className="flex items-center bg-gray-50 rounded-lg p-4 shadow">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-white rounded mr-4" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-green-600">₹ {discountedPrice} <span className="text-gray-500 line-through text-sm ml-2">₹ {item.price}</span></p>
                    <p className="text-green-600 text-sm">{item.discountPercentage || 0}% OFF</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="border-t border-b py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span>₹ {totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-600">- ₹ {Math.round(totalDiscount)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>To Pay</span>
                <span>₹ {Math.round(payAmount)}</span>
              </div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-lg">Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
