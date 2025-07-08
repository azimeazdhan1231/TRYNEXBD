import { Facebook, Instagram, Twitter, Youtube, Phone, MessageCircle, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onAdminIconClick: () => void;
}

export default function Footer({ onAdminIconClick }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TryNex Lifestyle</h3>
            <p className="text-gray-400 mb-4">
              Premium gifts and lifestyle products with personalization services in Bangladesh.
            </p>
            
            {/* Ensure Admin Access Icons activate on 5th click */}
            <div className="flex space-x-4 mt-6">
              <Facebook 
                className="text-2xl hover:text-primary transition-colors cursor-pointer"
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    onAdminIconClick();
                  }
                }}
              />
              <Instagram 
                className="text-2xl hover:text-primary transition-colors cursor-pointer"
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    onAdminIconClick();
                  }
                }}
              />
              <Twitter 
                className="text-2xl hover:text-primary transition-colors cursor-pointer"
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    onAdminIconClick();
                  }
                }}
              />
              <Youtube 
                className="text-2xl hover:text-primary transition-colors cursor-pointer"
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    onAdminIconClick();
                  }
                }}
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/track-order" className="hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                01747292277
              </p>
              <p className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                01940689487
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@trynex.com
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TryNex Lifestyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
