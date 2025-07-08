import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Heart, Truck, Shield, Clock } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "We use only the highest quality materials for all our products"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Personalized Gifts",
      description: "Custom designs and personalization for every special occasion"
    },
    {
      icon: <Truck className="h-8 w-8 text-green-500" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery across Bangladesh"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all our products"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Quick Turnaround",
      description: "Fast production and delivery times for urgent orders"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Customer Support",
      description: "Dedicated customer support team to help you"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About TryNex Lifestyle
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium gifts and lifestyle products in Bangladesh. 
            We specialize in personalized items that make every moment special.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                TryNex Lifestyle was founded with a simple mission: to provide high-quality, 
                personalized gifts that help people express their love and appreciation for 
                the special people in their lives.
              </p>
              <p>
                What started as a small local business has grown into one of Bangladesh's 
                most trusted providers of custom gifts and lifestyle products. We take pride 
                in our attention to detail and commitment to customer satisfaction.
              </p>
              <p>
                Every product we create is made with care and attention to detail, ensuring 
                that your special moments are captured and preserved in the highest quality.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Our workshop"
              className="rounded-xl shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose TryNex Lifestyle?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide exceptional personalized gifts and lifestyle products that help 
                people create lasting memories and express their feelings in meaningful ways. 
                We strive to exceed customer expectations through quality, creativity, and service.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become Bangladesh's leading provider of personalized gifts and lifestyle 
                products, known for our innovation, quality, and customer-centric approach. 
                We envision a world where every gift tells a unique story.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Process Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Product", description: "Browse our catalog and select your favorite item" },
              { step: "2", title: "Customize Design", description: "Add your personal touch with custom text or images" },
              { step: "3", title: "Place Order", description: "Pay ১০০৳ advance and confirm via WhatsApp" },
              { step: "4", title: "Receive & Enjoy", description: "Get your personalized product delivered to your door" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="bg-primary text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Something Special?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let us help you create the perfect personalized gift for your loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
