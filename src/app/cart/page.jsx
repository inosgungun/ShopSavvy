"use client";
import { useState, useEffect } from "react";

export default function CartPage() {

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
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-xl text-center font-semibold mb-4">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
                cartItems.map((item, index) => {
                    const discountedPrice = Math.round(item.price - (item.price * (item.discountPercentage || 0) / 100));
                    const quantity = item.quantity || 1;

                    return (
                        <div key={`${item.id}-${index}`} className="flex items-center justify-between mb-4 border-b pb-2">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded bg-white" />
                            <div className="flex-1 mx-2">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-green-600">₹ {discountedPrice}</p>
                                <p className="text-green-600 text-sm">{item.discountPercentage || 0}% OFF</p>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-500 line-through text-sm">₹ {item.price}</div>
                                <div className="flex items-center space-x-2 mt-2">
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
                        </div>
                    );
                })
            )}

            {cartItems.length > 0 && (
                <>
                    <div className="border-t border-b py-2 my-4">
                        <div className="flex justify-between mb-1">
                            <span>Total</span>
                            <span>₹ {totalPrice}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span>Discount</span>
                            <span className="text-green-600">- ₹ {Math.round(totalDiscount)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Pay</span>
                            <span>₹ {Math.round(payAmount)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Pay</span>
                        <span className="font-semibold">₹ {Math.round(payAmount)}</span>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Checkout</button>
                </>
            )}
        </div>
    );
}
