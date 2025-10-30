import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amazon-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Amazon Clone</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all your shopping needs. 
              Quality products, great prices, and excellent service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amazon-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amazon-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amazon-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amazon-orange transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Clothing" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=Books" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home & Garden" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Home & Garden
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-amazon-orange transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amazon-orange" />
                <span className="text-gray-300">support@amazonclone.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amazon-orange" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-amazon-orange mt-1" />
                <span className="text-gray-300">
                  123 Commerce Street<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm">
              © 2024 Amazon Clone. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-amazon-orange text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-amazon-orange text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-amazon-orange text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
