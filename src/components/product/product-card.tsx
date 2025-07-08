import { useState } from "react";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductModal from "./product-modal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const formatPrice = (price: number) => {
    return `৳${Math.floor(price / 100)}`;
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <>
      <Card className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden product-card-hover">
        <div className="relative">
          <img
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              Save ৳{Math.floor((product.originalPrice! - product.price) / 100)}
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-secondary text-white">
              Featured
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-secondary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-gray-500 line-through text-sm">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              Stock: {product.inStock}
            </span>
          </div>
          
          <Button
            onClick={() => setShowModal(true)}
            className="w-full bg-primary hover:bg-blue-700 text-white transition-colors"
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
