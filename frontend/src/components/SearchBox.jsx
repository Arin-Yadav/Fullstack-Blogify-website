import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "../helpers/RouteName";

const SearchBox = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };

  return (
    <section className="w-full py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        <form
          className="w-full max-w-xl sm:max-w-2xl relative"
          onSubmit={handleSearch}>
          <input
            onInput={getInput}
            name="q"
            type="text"
            placeholder="Search articles, topics, authors..."
            className="w-full px-3 sm:px-6 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg border-2 hover:border-[#f38b15] outline-none transition-colors duration-200 ease-in"
          />
          <span className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-base sm:text-lg md:text-xl">
            🔍
          </span>
        </form>
      </div>

      {/* Tag Buttons */}
      {/* <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer">
          📊 Productivity
        </button>
        <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer">
          🧘 Mindfulness
        </button>
        <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer">
          💻 Tech
        </button>
        <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer">
          🎨 Creativity
        </button>
        <button className="body-font text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full font-medium bg-transparent hover:bg-[#f38b15] transition-colors duration-300 ease-in-out hover:text-white cursor-pointer">
          💚 Health
        </button>
      </div> */}
    </section>
  );
};

export default SearchBox;
