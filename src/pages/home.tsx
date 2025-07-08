import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product/product-card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProductsQuery = useQuery({
    queryKey: ["/api/products", { featured: "true" }],
    queryFn: () => fetch("/api/products?featured=true").then(res => res.json()),
  });

  const siteContentQuery = useQuery({
    queryKey: ["/api/site-content"],
  });

  const getSiteContent = (key: string, defaultValue: string) => {
    return siteContentQuery.data?.find((item: any) => item.key === key)?.value || defaultValue;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="absolute inset-0"
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {getSiteContent("hero_title", "Premium Gifts & Lifestyle Products")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {getSiteContent("hero_subtitle", "Personalized T-shirts, Mugs, Photo Frames & More | গুণমান ও সাশ্রয়ী দামে")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="trynex-secondary-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => window.location.href = "/products"}
              >
                Shop Now | এখনি কিনুন
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Popular choices for gifts and personal use</p>
          </div>

          {featuredProductsQuery.isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProductsQuery.error ? (
            <div className="text-center text-gray-500 py-12">
              <p>Failed to load featured products. Please try again later.</p>
            </div>
          ) : featuredProductsQuery.data?.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>No featured products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProductsQuery.data?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3 font-semibold"
              onClick={() => window.location.href = "/products"}
            >
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 trynex-secondary-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🎁 Special Offer - ১০০৳ Advance Payment Required</h2>
          <p className="text-xl mb-6">To confirm your order, pay ১০০৳ advance via Bkash, Nagad, or Upay</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="font-semibold">Payment Number: 01747292277</span>
            </div>
            <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="font-semibold">WhatsApp: 01940689487</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect gift for every occasion</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3", count: "12+ Items" },
              { name: "Mugs", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3", count: "8+ Items" },
              { name: "Picture Frames", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3", count: "6+ Items" },
              { name: "Water Tumblers", image: "https://pixabay.com/get/ga52b1b0ca946643b2e8e308d521d8738a8e5d8abdadc73cd26c1d5d4c8c6c3b0baf14a124c23bf81124f06ec65160d3bf27d76ed8bc07919b7547a8a3e04e055_1280.jpg", count: "4+ Items" },
            ].map((category) => (
              <Card key={category.name} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
