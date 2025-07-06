import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
