import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white px-4 sm:px-6 lg:px-8 py-4 shadow-sm flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 cursor-pointer">
        <h1 className="text-2xl sm:text-3xl">✍️</h1>
        <a href="/">
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
        <li className="body-font text-sm font-medium hover:opacity-70 transition-opacity hover:scale-110 duration-300 cursor-pointer">
          Home
        </li>
        <li className="body-font text-sm font-medium hover:opacity-70 transition-opacity hover:scale-110 duration-300 cursor-pointer">
          Archive
        </li>
        <li className="body-font text-sm font-medium hover:opacity-70 transition-opacity hover:scale-110 duration-300 cursor-pointer">
          Authors
        </li>
        {/* <li className="body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:hover:scale-105">
          <a href="/signin">Sign in</a>
        </li> */}
        <a href="/signin">
          <button className="body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:hover:scale-105">
            Sign in
          </button>
        </a>
      </ul>

      {/* Mobile Menu Icon */}
      <button className="sm:hidden cursor-pointer" aria-label="Open Menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
