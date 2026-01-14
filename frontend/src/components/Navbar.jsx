import React from "react";
import { FaHamburger } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignin } from "../helpers/RouteName";
// import axios from "axios";

const Navbar = () => {
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
        <a href={RouteIndex}>
          <h1 className="heading-font text-lg sm:text-2xl font-bold">
            ThinkSpace
          </h1>
          <p
            id="site-tagline"
            className="body-font text-[10px] sm:text-xs opacity-75">
            Where Ideas Come to Life
          </p>
        </a>
      </div>

      {/* Nav Links */}
      <ul className="hidden sm:flex items-center gap-4 sm:gap-6">
        <li className="body-font text-sm font-medium hover:text-[#0f766e] transition-opacity duration-300 cursor-pointer">
          Home
        </li>
        <li className="body-font text-sm font-medium hover:text-[#0f766e] transition-opacity duration-300 cursor-pointer">
          Archive
        </li>
        <li className="body-font text-sm font-medium hover:text-[#0f766e] transition-opacity duration-300 cursor-pointer">
          Authors
        </li>
        {!isLogged ? (
          <Link
            to={RouteSignin}
            className="body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:hover:scale-105">
            Sign in
          </Link>
        ) : (
          <li className="body-font text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 cursor-pointer">
            <button onClick={handleSignout}>Logout</button>
          </li>
        )}
      </ul>

      {/* Mobile Menu Icon */}
      <button className="sm:hidden cursor-pointer">
        <FaHamburger />
      </button>
    </nav>
  );
};

export default Navbar;
