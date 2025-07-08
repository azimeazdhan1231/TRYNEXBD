import { useState } from "react";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, X } from "lucide-react";
import PaymentModal from "../payment/payment-modal";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const formatPrice = (price: number) => {
    return `৳${Math.floor(price / 100)}`;
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const totalPrice = product.price * quantity;

  const handleOrderNow = () => {
    setShowPaymentModal(true);
  };

  const getVariantString = () => {
    const variants = [];
    if (selectedSize) variants.push(selectedSize);
    if (selectedColor) variants.push(selectedColor);
    if (selectedOption) variants.push(selectedOption);
    return variants.join(", ");
  };

  const orderData = {
    products: [{
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      variant: getVariantString(),
    }],
    totalAmount: totalPrice,
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Product Details</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <img
                src={product.images[0] || "/placeholder-product.jpg"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {product.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} variant ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                {product.featured && (
                  <Badge className="bg-secondary text-white">Featured</Badge>
                )}
              </div>

              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-secondary mr-4">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-gray-500 line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                )}
              </div>

              {/* Product Options */}
              <div className="space-y-4 mb-6">
                {product.variants?.sizes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {product.variants?.colors && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {product.variants?.options && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                      disabled={quantity >= product.inStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-secondary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleOrderNow}
                  className="w-full bg-primary hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-colors"
                  disabled={product.inStock === 0}
                >
                  Order Now - Pay ১০০৳ Advance
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold"
                  disabled={product.inStock === 0}
                >
                  Add to Cart
                </Button>
              </div>

              {/* Product Information */}
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Product Description:</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• High-quality materials</li>
                    <li>• Custom design available</li>
                    <li>• Fast delivery</li>
                    <li>• Quality guarantee</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Category: {product.category}</span>
                  <span>In Stock: {product.inStock}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showPaymentModal && (
        <PaymentModal
          orderData={orderData}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
}