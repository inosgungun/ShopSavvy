import { useRouter } from "next/navigation";
import { products } from "../lib/products";
import Link from 'next/link';
import toast from "react-hot-toast"

export default function ProductCard({ id }) {
  const router = useRouter();
  const product = products.find(p => p.id === id);
  if (!product) return <div>Product not found</div>;

  const addToCart = (e) => {
    e.preventDefault();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Product added to cart!");
  };

  const buyNow = (e) => {
    e.preventDefault();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    router.push("/cart");
  };

  const discountedPrice = Math.round(product.price - (product.price * (product.discountPercentage || 0) / 100));

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition flex flex-col h-full">
      <Link href={`/product/${id}`} className="block">
        <div className="h-60 w-70 overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-60 h-50 object-cover"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col px-2 py-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold">{product.name}</h2>
          <p className="text-black-600 text-xs">⭐{product.rating}</p>
        </div>

        <div className="mt-auto border-t pt-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-700 text-xs">Price</span>
            <div className="text-green-600 text-xs">{product.discountPercentage || 0}% OFF</div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 line-through text-xs">₹{product.price}</div>
              <div className="text-blue-600 font-bold text-base">₹{discountedPrice}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 px-2 pb-2">
        <button
          className="flex-1 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={addToCart}
        >
          Add to cart
        </button>
        <button
          className="flex-1 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={buyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
