import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Star, 
  Tags, 
  Edit, 
  Users, 
  LogOut,
  X,
  Eye,
  MessageCircle,
  Clock,
  DollarSign
} from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
  stats?: any;
}

export default function AdminPanel({ onClose, stats }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["/api/products"],
  });

  const ordersQuery = useQuery({
    queryKey: ["/api/orders"],
  });

  const formatPrice = (price: number) => {
    return `৳${Math.floor(price / 100)}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-white border-r overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-gray-600">TryNex Lifestyle Management</p>
            </div>

            <div className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                <TabsList className="flex flex-col h-auto w-full space-y-1">
                  <TabsTrigger value="dashboard" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="products" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-3" />
                    Products ({productsQuery.data?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Orders ({ordersQuery.data?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="featured" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-3" />
                    Featured Products
                  </TabsTrigger>
                  <TabsTrigger value="promos" className="w-full justify-start">
                    <Tags className="h-4 w-4 mr-3" />
                    Promo Codes
                  </TabsTrigger>
                  <TabsTrigger value="content" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-3" />
                    Site Content
                  </TabsTrigger>
                  <TabsTrigger value="users" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-3" />
                    Admin Users
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-4 border-t mt-auto">
              <Button
                onClick={onClose}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {activeTab === "dashboard" && "Dashboard Overview"}
                  {activeTab === "products" && "Products Management"}
                  {activeTab === "orders" && "Orders Management"}
                  {activeTab === "featured" && "Featured Products"}
                  {activeTab === "promos" && "Promo Codes"}
                  {activeTab === "content" && "Site Content"}
                  {activeTab === "users" && "Admin Users"}
                </h1>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Dashboard */}
                <TabsContent value="dashboard" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">Total Products</p>
                            <p className="text-3xl font-bold text-primary">
                              {stats?.totalProducts || productsQuery.data?.length || 0}
                            </p>
                          </div>
                          <Package className="h-8 w-8 text-primary opacity-20" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">Pending Orders</p>
                            <p className="text-3xl font-bold text-secondary">
                              {stats?.pendingOrders || ordersQuery.data?.filter(o => o.status === 'pending').length || 0}
                            </p>
                          </div>
                          <Clock className="h-8 w-8 text-secondary opacity-20" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">Revenue Today</p>
                            <p className="text-3xl font-bold text-accent">
                              {formatPrice(stats?.todayRevenue || 0)}
                            </p>
                          </div>
                          <DollarSign className="h-8 w-8 text-accent opacity-20" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600">Featured Items</p>
                            <p className="text-3xl font-bold text-purple-600">
                              {stats?.featuredItems || productsQuery.data?.filter(p => p.featured).length || 0}
                            </p>
                          </div>
                          <Star className="h-8 w-8 text-purple-600 opacity-20" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3">Order ID</th>
                              <th className="text-left py-3">Customer</th>
                              <th className="text-left py-3">Amount</th>
                              <th className="text-left py-3">Status</th>
                              <th className="text-left py-3">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersQuery.data?.slice(0, 5).map((order) => (
                              <tr key={order.id} className="border-b">
                                <td className="py-3">{order.orderId}</td>
                                <td className="py-3">{order.customerName}</td>
                                <td className="py-3">{formatPrice(order.totalAmount)}</td>
                                <td className="py-3">
                                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-3">{formatDate(order.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Products */}
                <TabsContent value="products" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div></div>
                    <Button className="bg-primary hover:bg-blue-700">
                      <Package className="h-4 w-4 mr-2" />
                      Add New Product
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productsQuery.data?.map((product) => (
                      <Card key={product.id}>
                        <CardContent className="p-6">
                          <img
                            src={product.images[0] || "/placeholder-product.jpg"}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {formatPrice(product.price)} - In Stock ({product.inStock})
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Edit
                            </Button>
                            <Button 
                              variant={product.featured ? "default" : "outline"} 
                              size="sm"
                              className={product.featured ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Orders */}
                <TabsContent value="orders" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left py-4 px-6 font-semibold">Order Details</th>
                              <th className="text-left py-4 px-6 font-semibold">Customer Info</th>
                              <th className="text-left py-4 px-6 font-semibold">Amount</th>
                              <th className="text-left py-4 px-6 font-semibold">Status</th>
                              <th className="text-left py-4 px-6 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersQuery.data?.map((order) => (
                              <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">
                                  <div>
                                    <p className="font-semibold">{order.orderId}</p>
                                    <p className="text-sm text-gray-600">
                                      {order.products.map(p => `${p.name} (x${p.quantity})`).join(', ')}
                                    </p>
                                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <div>
                                    <p className="font-medium">{order.customerName}</p>
                                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                                    <p className="text-xs text-gray-500">{order.customerAddress}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <p className="font-semibold">{formatPrice(order.totalAmount)}</p>
                                  <p className="text-xs text-green-600">Advance: ৳100</p>
                                </td>
                                <td className="py-4 px-6">
                                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="bg-green-500 hover:bg-green-600 text-white"
                                      onClick={() => {
                                        const message = `Hello ${order.customerName}! Your order ${order.orderId} has been updated.`;
                                        const whatsappUrl = `https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                                        window.open(whatsappUrl, '_blank');
                                      }}
                                    >
                                      <MessageCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Other tabs content would go here */}
                <TabsContent value="featured">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">Featured products management coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="promos">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">Promo codes management coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">Site content management coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="users">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">Admin users management coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}