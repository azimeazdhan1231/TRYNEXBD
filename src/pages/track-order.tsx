import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, CheckCircle, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { toast } = useToast();

  const orderQuery = useQuery({
    queryKey: ["/api/orders/track", orderId],
    queryFn: () => fetch(`/api/orders/track/${orderId}`).then(res => {
      if (!res.ok) {
        throw new Error('Order not found');
      }
      return res.json();
    }),
    enabled: searchTriggered && !!orderId,
    retry: false,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast({
        title: "Missing Order ID",
        description: "Please enter your order ID to track your order.",
        variant: "destructive",
      });
      return;
    }
    setSearchTriggered(true);
  };

  const formatPrice = (price: number) => {
    return `৳${Math.floor(price / 100)}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'pending': return 20;
      case 'confirmed': return 40;
      case 'processing': return 60;
      case 'shipped': return 80;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const orderSteps = [
    { key: 'pending', label: 'Order Placed', description: 'Your order has been received' },
    { key: 'confirmed', label: 'Confirmed', description: 'Payment verified and order confirmed' },
    { key: 'processing', label: 'Processing', description: 'Your order is being prepared' },
    { key: 'shipped', label: 'Shipped', description: 'Your order is on the way' },
    { key: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Track Your Order
          </h1>
          <p className="text-xl text-gray-600">
            Enter your order ID to check the current status and tracking information
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-primary" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId" className="sr-only">Order ID</Label>
                <Input
                  id="orderId"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  placeholder="Enter your Order ID (e.g., TN000001)"
                  className="text-lg"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white px-8"
                disabled={orderQuery.isLoading}
              >
                <Search className="h-4 w-4 mr-2" />
                {orderQuery.isLoading ? "Searching..." : "Track Order"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {searchTriggered && (
          <>
            {orderQuery.isLoading && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching for your order...</p>
                </CardContent>
              </Card>
            )}

            {orderQuery.error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-8 text-center">
                  <div className="text-red-500 mb-4">
                    <Package className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Order Not Found</h3>
                  <p className="text-red-600 mb-4">
                    We couldn't find an order with ID "{orderId}". Please check your order ID and try again.
                  </p>
                  <div className="space-y-2 text-sm text-red-600">
                    <p>• Make sure you entered the correct order ID</p>
                    <p>• Order IDs are usually in format TN000001</p>
                    <p>• Check your WhatsApp confirmation message for the order ID</p>
                  </div>
                  <Button
                    onClick={() => window.open("https://wa.me/01940689487", "_blank")}
                    variant="outline"
                    className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            )}

            {orderQuery.data && (
              <div className="space-y-8">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">Order {orderQuery.data.orderId}</CardTitle>
                        <p className="text-gray-600">Placed on {formatDate(orderQuery.data.createdAt)}</p>
                      </div>
                      <Badge className={`${getStatusColor(orderQuery.data.status)} flex items-center gap-1`}>
                        {getStatusIcon(orderQuery.data.status)}
                        {orderQuery.data.status.charAt(0).toUpperCase() + orderQuery.data.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Name:</span> {orderQuery.data.customerName}</p>
                          <p><span className="font-medium">Phone:</span> {orderQuery.data.customerPhone}</p>
                          <p><span className="font-medium">Address:</span> {orderQuery.data.customerAddress}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Total Amount:</span> {formatPrice(orderQuery.data.totalAmount)}</p>
                          <p><span className="font-medium">Advance Paid:</span> ৳100</p>
                          <p><span className="font-medium">Remaining:</span> {formatPrice(orderQuery.data.totalAmount - 10000)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderQuery.data.products.map((product: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            {product.variant && (
                              <p className="text-sm text-gray-600">Variant: {product.variant}</p>
                            )}
                            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatPrice(product.price * product.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Tracking */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Progress Bar */}
                      <div className="absolute top-8 left-4 right-4 h-1 bg-gray-200 rounded">
                        <div
                          className="h-full bg-primary rounded transition-all duration-500"
                          style={{ width: `${getProgressPercentage(orderQuery.data.status)}%` }}
                        ></div>
                      </div>

                      {/* Steps */}
                      <div className="relative space-y-8">
                        {orderSteps.map((step, index) => {
                          const isCompleted = orderSteps.findIndex(s => s.key === orderQuery.data.status) >= index;
                          const isCurrent = step.key === orderQuery.data.status;
                          
                          return (
                            <div key={step.key} className="flex items-center">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                isCompleted 
                                  ? 'bg-primary border-primary text-white' 
                                  : 'bg-white border-gray-300 text-gray-400'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <span className="text-xs font-semibold">{index + 1}</span>
                                )}
                              </div>
                              <div className="ml-4">
                                <h4 className={`font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {step.label}
                                </h4>
                                <p className={`text-sm ${isCurrent ? 'text-primary' : isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Actions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => {
                          const message = `Hello! I want to inquire about my order ${orderQuery.data.orderId}.`;
                          const whatsappUrl = `https://wa.me/01940689487?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.print()}
                      >
                        Print Order Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}

        {/* Help Section */}
        {!searchTriggered && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="font-semibold text-blue-900 mb-4">Need Help Finding Your Order ID?</h3>
              <div className="space-y-2 text-blue-800">
                <p>• Check your WhatsApp conversation with us (01940689487)</p>
                <p>• Order IDs are in the format TN000001, TN000002, etc.</p>
                <p>• The order ID was sent to you when you placed your order</p>
              </div>
              <Button
                onClick={() => window.open("https://wa.me/01940689487", "_blank")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Get Help on WhatsApp
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
