import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();

  const submitFormMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Generate WhatsApp message for contact form
      const message = `New Contact Form Submission:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}

Message:
${data.message}`;

      const whatsappUrl = `https://wa.me/01940689487?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Your message has been sent via WhatsApp. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and message.",
        variant: "destructive",
      });
      return;
    }
    
    submitFormMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      details: "01747292277",
      description: "Payment & Order Support"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-green-500" />,
      title: "WhatsApp",
      details: "01940689487",
      description: "Quick Customer Support"
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: "Email",
      details: "info@trynex.com",
      description: "General Inquiries"
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-500" />,
      title: "Location",
      details: "Dhaka, Bangladesh",
      description: "Serving Nationwide"
    }
  ];

  const businessHours = [
    { day: "Saturday - Thursday", hours: "9:00 AM - 9:00 PM" },
    { day: "Friday", hours: "2:00 PM - 9:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our products or need help with your order? 
            We're here to help! Get in touch with us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-primary font-medium">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick WhatsApp Button */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Chat with us directly on WhatsApp for instant support
                </p>
                <Button
                  onClick={() => window.open("https://wa.me/01940689487", "_blank")}
                  className="bg-green-500 hover:bg-green-600 text-white w-full"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3"
                    disabled={submitFormMutation.isPending}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {submitFormMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I place an order?",
                answer: "Browse our products, click 'View Details', customize your order, and pay ১০০৳ advance. Then confirm via WhatsApp."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept Bkash, Nagad, and Upay for advance payments. Full payment can be made on delivery."
              },
              {
                question: "How long does delivery take?",
                answer: "Standard delivery takes 3-5 business days within Dhaka and 5-7 days outside Dhaka."
              },
              {
                question: "Can I customize my products?",
                answer: "Yes! Most of our products can be personalized with your text, images, or designs."
              },
              {
                question: "What is your return policy?",
                answer: "We offer exchanges for defective items within 7 days. Custom items are non-returnable unless faulty."
              },
              {
                question: "Do you deliver outside Dhaka?",
                answer: "Yes, we deliver nationwide across Bangladesh with varying delivery times."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
