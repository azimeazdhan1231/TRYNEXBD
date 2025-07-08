import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/product-card";
import { Search } from "lucide-react";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const productsQuery = useQuery({
    queryKey: ["/api/products", { category: selectedCategory, search: searchQuery }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      
      return fetch(`/api/products?${params.toString()}`).then(res => res.json());
    },
  });

  const sortedProducts = productsQuery.data ? [...productsQuery.data].sort((a: any, b: any) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  }) : [];

  const categories = [
    { value: "", label: "All Categories" },
    { value: "t-shirts", label: "T-Shirts" },
    { value: "mugs", label: "Mugs" },
    { value: "picture-frames", label: "Picture Frames" },
    { value: "water-tumblers", label: "Water Tumblers" },
  ];

  const sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "name", label: "Name A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-xl text-gray-600">Browse our complete collection</p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3"
            />
            <Search className="h-4 w-4 absolute left-3 top-4 text-gray-400" />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {productsQuery.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : productsQuery.error ? (
          <div className="text-center text-gray-500 py-12">
            <p>Failed to load products. Please try again later.</p>
            <Button 
              onClick={() => productsQuery.refetch()} 
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No products found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSortBy("");
              }} 
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Load More Button (if needed for pagination) */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 font-semibold"
              disabled
            >
              All Products Loaded
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
