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
      <div className="flex items-center justify-center gap-4">
        <form
          className="w-full"
          onSubmit={handleSearch}>
          <input
            onInput={getInput}
            name="q"
            type="text"
            placeholder="Search articles, topics..."
            className="w-full px-3 sm:px-6 py-2 rounded-full text-sm sm:text-base md:text-md border-2 hover:border-[#f38b15] outline-none transition-colors duration-200 ease-in"
          />
        </form>
      </div>
  );
};

export default SearchBox;
