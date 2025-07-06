"use client";
import { useRouter } from "next/navigation";
import { use } from "react";
import { products } from "@/lib/products";

export default function ProductDetail({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-2 text-red-600">Product not found</h2>
                <p className="text-gray-700">The product you're looking for doesn't exist.</p>
            </div>
        );
    }

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert("Product added to cart!");
    };

    const buyNow = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1;
        } else {1
            existingCart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem("cart", JSON.stringify(existingCart));
        router.push("/cart");
    }

    const discountedPrice = Math.round(product.price - (product.price * (product.discountPercentage || 0) / 100));

    return (
        <div className="max-w-xl mx-auto p-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain mb-4 bg-white rounded"
            />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-yellow-600 mb-1">⭐{product.rating}</p>
            <p className="mb-4 text-gray-700">{product.description}</p>
            
            <div className="flex items-center justify-between border-b border-b-cyan-950 pb-2 mb-4">
                <span className="text-gray-700 font-medium">Price</span>
                <div className="text-right">
                    <span className="text-gray-500 line-through text-sm">₹ {product.price}</span>
                    <div className="text-blue-600 font-bold text-xl">₹ {discountedPrice}</div>
                    <span className="text-green-600 text-sm font-medium">{product.discountPercentage || 0}% OFF</span>
                </div>
            </div>

            <div className="flex space-x-4">
                <button 
                    className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
                <button 
                    className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={buyNow}
                >
                    Buy Now
                </button>
            </div>
        </div>
    )
}