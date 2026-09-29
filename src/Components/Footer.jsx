import React from 'react';
import { 
  FaShippingFast, 
  FaStar, 
  FaUndo, 
  FaCreditCard, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaHeadset 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-white text-gray-600 font-sans border-t border-gray-200">
      
      {/* 1. Feature Highlights Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <FaShippingFast className="text-3xl text-sky-500" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm tracking-wide">FREE SHIPPING</h4>
            <p className="text-xs text-gray-500">Order via Campaign</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <FaStar className="text-3xl text-sky-500" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm tracking-wide">BEST PRICE</h4>
            <p className="text-xs text-gray-500">Quality products</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <FaUndo className="text-3xl text-sky-500" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm tracking-wide">FREE RETURN</h4>
            <p className="text-xs text-gray-500">Within 7 days returns</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <FaCreditCard className="text-3xl text-sky-500" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm tracking-wide">SECURE PAYMENT</h4>
            <p className="text-xs text-gray-500">100% secure payment</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {/* Logo image/icon */}
            <div className="w-10 h-10 rounded-full border border-sky-400 flex items-center justify-center text-sky-500">
              🛒
            </div>
            <div>
              <span className="text-xl font-bold text-sky-500 block leading-tight">project</span>
              <span className="text-xl font-bold text-sky-500 block leading-tight">nirvoya</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs hover:opacity-80">
              <FaFacebookF />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-sky-400 text-white flex items-center justify-center text-xs hover:opacity-80">
              <FaTwitter />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs hover:opacity-80">
              <FaLinkedinIn />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs hover:opacity-80">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-gray-500">
            <li><a href="#" className="hover:text-sky-500">About us</a></li>
            <li><a href="#" className="hover:text-sky-500">Contact us</a></li>
            <li><a href="#" className="hover:text-sky-500">Products</a></li>
            <li><a href="#" className="hover:text-sky-500">Login</a></li>
            <li><a href="#" className="hover:text-sky-500">Sign Up</a></li>
          </ul>
        </div>

        {/* Customer Area */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4">Customer Area</h3>
          <ul className="space-y-2.5 text-sm text-gray-500">
            <li><a href="#" className="hover:text-sky-500">My Account</a></li>
            <li><a href="#" className="hover:text-sky-500">Orders</a></li>
            <li><a href="#" className="hover:text-sky-500">Terms</a></li>
            <li><a href="#" className="hover:text-sky-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-sky-500">Shipping Information</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4">Contact</h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className="flex items-center space-x-3">
            <FaHeadset className="text-4xl text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Have any question?</p>
              <p className="text-xl font-bold text-sky-500">099 456 789</p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Copyright & Payment Methods */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>Projectnirvoya - © 2021 All Rights Reserved</p>
          
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="font-semibold text-sky-500">Pay With</span>
            {/* Payment Icons Placeholder / Images */}
            <div className="flex items-center space-x-1.5 opacity-80">
              <span className="font-bold text-blue-700 italic text-sm">VISA</span>
              <span className="font-bold text-red-500 text-xs">MasterCard</span>
              <span className="bg-blue-600 text-white px-1 text-[10px] rounded">AMEX</span>
              <span className="bg-pink-600 text-white px-1 text-[10px] rounded">bKash</span>
              <span className="bg-orange-500 text-white px-1 text-[10px] rounded">Nagad</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;