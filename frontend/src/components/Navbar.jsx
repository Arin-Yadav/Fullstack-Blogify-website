import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignin } from "../helpers/RouteName";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import UserProfileDropdown from "./UserProfile";
// import axios from "axios";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const isLogged = localStorage.getItem("token");

  const handleSignout = async () => {
    try {
      // await axios.get(`${import.meta.env.VITE_API_URL}/auth/signout`, {
      //   withCredentials: true,
      // });
      localStorage.removeItem("token");
      window.location.reload();
      navigate(RouteIndex);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <nav className="sticky top-0 z-10 w-full h-20 bg-white px-4 sm:px-6 lg:px-8 py-4 shadow-sm flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 cursor-pointer">
        <h1 className="text-2xl sm:text-3xl">✍️</h1>
        <Link to="/">
          <h1 className="heading-font text-lg sm:text-2xl font-bold">
            ThinkSpace
          </h1>
          <p
            id="site-tagline"
            className="body-font text-[10px] sm:text-xs opacity-75">
            Where Ideas Come to Life
          </p>
        </Link>
      </div>
      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex items-center gap-4 sm:gap-6">
        <li className="body-font text-sm font-medium hover:text-[#0f766e] transition-colors duration-300 cursor-pointer">
          Home
        </li>
        <li className="body-font text-sm font-medium hover:text-[#0f766e] transition-colors duration-300 cursor-pointer">
          Archive
        </li>
        <li className="body-font text-sm font-medium hover:text-[#0f766e] transition-colors duration-300 cursor-pointer">
          Authors
        </li>
        {!isLogged ? (
          <Link
            to="/signin"
            className="body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:scale-105">
            Sign in
          </Link>
        ) : (
          <UserProfileDropdown />
        )}
      </ul>
      {/* Mobile Menu Icon */}
      <button
        className="sm:hidden cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? (
          <IoCloseOutline className="w-6 h-6" />
        ) : (
          <IoMenuOutline className="w-6 h-6" />
        )}
      </button>
      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-200 shadow-lg sm:hidden z-20">
          <ul className="flex flex-col items-start gap-2 px-6 py-4">
            <li className="w-full body-font text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300 cursor-pointer">
              Home
            </li>
            <li className="w-full body-font text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300 cursor-pointer">
              Archive
            </li>
            <li className="w-full body-font text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300 cursor-pointer">
              Authors
            </li>
            {!isLogged ? (
              <Link
                to="/signin"
                className="w-full text-center body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:scale-105">
                Sign in
              </Link>
            ) : (
              <button
                onClick={handleSignout}
                className="w-full body-font text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
