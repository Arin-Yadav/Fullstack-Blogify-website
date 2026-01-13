import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer class="w-full py-12 px-6 border-t-2">
      <div class="max-w-7xl mx-auto">
        {/* <!-- Responsive grid --> */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* <!-- About Section --> */}
          <div class="md:col-span-2 lg:col-span-2 text-center md:text-left">
            <h4 class="heading-font text-2xl font-bold mb-4">
              About ThinkSpace
            </h4>
            <p class="body-font text-base opacity-75 mb-6">
              A modern platform for sharing ideas, stories, and knowledge. Join
              our community of passionate writers and curious readers.
            </p>
            <div class="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                class="text-2xl hover:opacity-70 transition-opacity hover:text-blue-500">
                <FaTwitter />
              </a>
              <a
                href="#"
                class="text-2xl hover:opacity-70 transition-opacity hover:text-pink-500">
                <FaInstagram />
              </a>
              <a
                href="#"
                class="text-2xl hover:opacity-70 transition-opacity hover:text-blue-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* <!-- Quick Links --> */}
          <div class="text-center">
            <h5 class="body-font text-sm font-bold mb-4 uppercase tracking-wider">
              Quick Links
            </h5>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="body-font text-base hover:opacity-70 transition-opacity">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="body-font text-base hover:opacity-70 transition-opacity">
                  Advertise
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="body-font text-base hover:opacity-70 transition-opacity">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* <!-- Resources --> */}
          <div class="text-center">
            <h5 class="body-font text-sm font-bold mb-4 uppercase tracking-wider">
              Resources
            </h5>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="body-font text-base hover:opacity-70 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="body-font text-base hover:opacity-70 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="body-font text-base hover:opacity-70 transition-opacity">
                  Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Copyright --> */}
        <div class="pt-8 text-center">
          <p id="footer-copyright" class="body-font text-sm opacity-75">
            © 2026 ThinkSpace. All rights reserved. Made with ❤️ for writers and
            readers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
