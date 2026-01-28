import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import DesktopUserProfile from "./DesktopUserProfile";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBox from "./SearchBox";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [showSearch, setShowSearch] = useState(false);
  const user = useSelector((state) => state.user);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="sticky top-0 z-10 w-full h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 shadow-sm flex justify-between items-center">
      {/* Mobile Sidebar Toggle */}
      <button
        className="sm:hidden p-2 rounded-md bg-white border border-gray-300 shadow-md focus:ring-2 focus:ring-teal-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
      </button>
      {/* Logo */}
      <div className="cursor-pointer pl-3">
        <h1 className="text-2xl">✍️</h1>
      </div>

      <div className="w-[500px]">
        <div
          className={`md:relative md:block absolute left-0 top-14 w-full bg-white md:top-0 md:p-0 p-5 ${showSearch ? "block" : "hidden"}`}>
          <SearchBox />
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="flex items-center">
        {/* Search Button */}
        <button
          type="submit"
          onClick={toggleSearch}
          className="flex items-center justify-center md:hidden w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full hover:bg-gray-100 transition">
          <CiSearch size={20} className="text-gray-700" />
        </button>
        <ul className="sm:flex items-center gap-4 sm:gap-6">
          {!user.isLoggedIn ? (
            <button className="body-font md:w-30 md:text-lg py-2 rounded-full text-sm w-20 cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white transition-transform hover:scale-105">
              <Link to="/signin">Sign in</Link>
            </button>
          ) : (
            <DesktopUserProfile user={user.user} />
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
