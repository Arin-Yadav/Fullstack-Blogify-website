import React from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import DesktopUserProfile from "./DesktopUserProfile";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="sticky top-0 z-10 w-full h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 shadow-sm flex justify-between items-center">
      {/* Mobile Sidebar Toggle */}
      <button
        className="sm:hidden p-2 rounded-md bg-white border border-gray-300 shadow-md focus:ring-2 focus:ring-teal-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
      </button>
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
        {!user.isLoggedIn ? (
          <button className="body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:scale-105">
            <Link to="/signin">Sign in</Link>
          </button>
        ) : (
          <DesktopUserProfile user={user.user} />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
