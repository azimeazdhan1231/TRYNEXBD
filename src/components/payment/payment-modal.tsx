import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertOrderSchema } from "@shared/schema";

interface OrderData {
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    variant?: string;
  }[];
  totalAmount: number;
}

interface PaymentModalProps {
  orderData: OrderData;
  onClose: () => void;
}

export default function PaymentModal({ orderData, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const orderPayload = {
        ...data,
        products: orderData.products,
        totalAmount: orderData.totalAmount,
        status: "pending",
        paymentStatus: "advance",
      };

      const validatedData = insertOrderSchema.parse(orderPayload);
      const response = await apiRequest("POST", "/api/orders", validatedData);
      return response.json();
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });

      // Generate WhatsApp message
      const productList = orderData.products
        .map(p => `${p.name} (${p.variant || 'Standard'}) x${p.quantity}`)
        .join('\n');

      const message = `Hello! I want to confirm my order from TryNex Lifestyle.

Order ID: ${order.orderId}
Products:
${productList}

Total Amount: ৳${Math.floor(orderData.totalAmount / 100)}
Advance Paid: ৳100

Customer Details:
Name: ${formData.customerName}
Phone: ${formData.customerPhone}
Address: ${formData.customerAddress}

I have paid the ১০০৳ advance via Bkash/Nagad/Upay to 01747292277.`;

      const whatsappUrl = `https://wa.me/01940689487?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Order Created Successfully!",
        description: `Your order ID is ${order.orderId}. You'll be redirected to WhatsApp to confirm payment.`,
      });

      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerPhone || !formData.customerAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createOrderMutation.mutate(formData);
  };

  const formatPrice = (price: number) => {
    return `৳${Math.floor(price / 100)}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Fill in your details to place your order and proceed to payment
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Pay ১০০৳ advance to confirm your order
          </p>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Order Summary:</h3>
            {orderData.products.map((product, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>{product.name} {product.variant && `(${product.variant})`} x{product.quantity}</span>
                <span>{formatPrice(product.price * product.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>{formatPrice(orderData.totalAmount)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customerName">Your Name *</Label>
              <Input
                id="customerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="customerPhone">Phone Number *</Label>
              <Input
                id="customerPhone"
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div>
              <Label htmlFor="customerAddress">Delivery Address *</Label>
              <Textarea
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange("customerAddress", e.target.value)}
                placeholder="Enter your complete address"
                rows={3}
                required
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-800">Payment Instructions:</h3>
              <div className="space-y-1 text-sm text-yellow-700">
                <p>1. Send ১০০৳ advance payment to: <strong>01747292277</strong></p>
                <p>2. Payment options: Bkash / Nagad / Upay</p>
                <p>3. Include your name in payment reference</p>
                <p>4. Click WhatsApp button below to confirm</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors flex items-center justify-center"
                disabled={createOrderMutation.isPending}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {createOrderMutation.isPending ? "Creating Order..." : "Continue on WhatsApp"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onClose}
                disabled={createOrderMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}