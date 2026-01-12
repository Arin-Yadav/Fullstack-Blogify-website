import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-center">
        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Follow Us
          </h3>
          <div className="flex justify-center gap-5">
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FaTwitter size={20} /> Twitter
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
              <FaInstagram size={20} /> Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors">
              <FaLinkedinIn size={20} /> Linkedin
            </a>
          </div>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors">
                Work With Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors">
                Partner Program
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className=" border-gray-200 py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
