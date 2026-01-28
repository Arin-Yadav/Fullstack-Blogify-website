import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-10 px-6 border-t-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* <!-- About Section --> */}
          <div className="md:col-span-2 lg:col-span-3 text-center md:text-left">
            <h4 className="heading-font text-2xl font-bold mb-4">
              About ThinkSpace
            </h4>
            <p className="body-font text-base opacity-75 mb-6">
              A modern platform for sharing ideas, stories, and knowledge. Join
              our community of passionate writers and curious readers.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
              target="_blank"
                to={'https://www.linkedin.com/in/arinyadav/'}
                className="text-2xl hover:opacity-70 transition-opacity hover:text-blue-500">
                <FaLinkedinIn />
              </Link>
              <Link
              target="_blank"
                to={'https://github.com/Arin-Yadav'}
                className="text-2xl hover:opacity-70 transition-opacity hover:text-pink-500">
                <FaGithub />
              </Link>
            </div>
          </div>

          {/* <!-- Resources --> */}
          <div className="text-center">
            <h5 className="body-font text-sm font-bold mb-4 uppercase tracking-wider">
              Resources
            </h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="body-font text-base hover:opacity-70 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="body-font text-base hover:opacity-70 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="body-font text-base hover:opacity-70 transition-opacity">
                  Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Copyright --> */}
        <div className="pt-8 text-center">
          <p id="footer-copyright" className="body-font text-sm opacity-75">
            © 2026 ThinkSpace. All rights reserved. Made with ❤️ for writers and
            readers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
