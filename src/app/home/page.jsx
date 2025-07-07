"use client";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const productsList = products || [];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productsList;
    const query = searchQuery.toLowerCase().trim();
    return productsList.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.price.toString().includes(query)
    );
  }, [searchQuery, productsList]);

  return (
    <div>
      <Header />
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 px-4">
        <div className="max-w-5xl mx-auto p-4">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name..."
                className="w-full px-4 py-2 pl-10 border bg-yellow-50 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                {filteredProducts.length === 0 ? (
                  <p>No products found for "{searchQuery}"</p>
                ) : (
                  <p>
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Product list */}
          {filteredProducts.length === 0 && !searchQuery ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
              <p className="text-gray-500">Check back later for new products!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
