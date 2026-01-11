import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CategorySelect = () => {
  const categories = [
    "All Categories",
    "Technology",
    "Lifestyle",
    "Business",
    "Health",
    "Travel",
    "Food",
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0]);

  return (
    <section className="w-full py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          {/* <div className="flex-1 max-w-2xl w-full relative">
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full text-sm sm:text-base border-2 hover:border-[#f38b15] outline-none transition-colors duration-75 ease-in"
            />
            <span className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl">
              🔍
            </span>
          </div> */}
          <div className="flex-1 max-w-xl sm:max-w-2xl w-full relative">
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              className="w-full 
               px-3 sm:px-6 
               py-2 sm:py-3 md:py-4 
               rounded-full 
               text-sm sm:text-base md:text-lg 
               border-2 
               hover:border-[#f38b15] 
               outline-none 
               transition-colors duration-200 ease-in"
            />
            <span
              className="absolute 
                   right-3 sm:right-6 
                   top-1/2 transform -translate-y-1/2 
                   text-base sm:text-lg md:text-xl">
              🔍
            </span>
          </div>

          {/* Category Select */}
          {/* <div className="relative inline-block">
            <select
              className="appearance-none px-6 py-4 rounded-full border-2 text-base hover:border-[#f38b15] outline-none transition-colors duration-75 ease-in cursor-pointer pr-12"
              onFocus={() => setOpen(true)} // when dropdown opens
              onBlur={() => setOpen(false)} // when dropdown closes
            >
              <option value="all">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>

            <FaChevronDown
              className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-in-out
                          ${
                            open
                              ? "rotate-180 text-[#f38b15]"
                              : "rotate-0 text-black"
                          }
            `}
            />
          </div> */}
          <div className="relative inline-block w-full sm:w-auto">
            {" "}
            {/* Trigger Button */}{" "}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full sm:w-64 px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-full border-2 text-sm sm:text-base md:text-lg hover:border-[#f38b15] transition-colors duration-200 ease-in cursor-pointer bg-white">
              {" "}
              {selected}{" "}
              <FaChevronDown
                className={`ml-2 transition-transform duration-300 ease-in-out ${
                  open ? "rotate-180 text-[#f38b15]" : "rotate-0 text-black"
                }`}
              />{" "}
            </button>{" "}
            {/* Dropdown Menu */}{" "}
            {open && (
              <ul className="absolute mt-2 w-full sm:w-64 bg-white rounded-lg shadow-lg z-10">
                {" "}
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setSelected(cat);
                      setOpen(false);
                    }}
                    className="px-4 py-2 sm:px-6 sm:py-3 hover:bg-[#f38b15] hover:text-white cursor-pointer transition-colors duration-200">
                    {" "}
                    {cat}{" "}
                  </li>
                ))}{" "}
              </ul>
            )}{" "}
          </div>
        </div>

        {/* Tag Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer hover:scale-105">
            📊 Productivity
          </button>
          <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer hover:scale-105">
            🧘 Mindfulness
          </button>
          <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer hover:scale-105">
            💻 Tech
          </button>
          <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer hover:scale-105">
            🎨 Creativity
          </button>
          <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer hover:scale-105">
            💚 Health
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySelect;
