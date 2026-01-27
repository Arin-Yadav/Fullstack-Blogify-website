import React from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/Loading";
import { TbCategory } from "react-icons/tb";
import { useFetch } from "../hooks/UseFetch";
import Card from "../components/Card";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const {
    data: blogData,
    loading,
    // error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/blog/search?q=${q}`, {
    withCredentials: true,
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-5">
      <div className="flex gap-2 items-center text-2xl font-bold w-full border-b pb-3">
        <p className="text-gray-800">Search Result For: {q}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto p-4 sm:p-6">
        {blogData && blogData?.blog?.length > 0 ? (
          blogData.blog.map((blog) => <Card blog={blog} key={blog._id} />)
        ) : (
          <div>
            <h1>Data not found...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
