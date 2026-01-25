import React from "react";
import Card from "./Card";
import { useFetch } from "../hooks/UseFetch";

const FeaturedPost = () => {
  const { data: blogData } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-all`,
    {
      withCredentials: true,
    },
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-10">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
        Featured Stories
      </h3>
      {/* container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto p-4 sm:p-6">
        {blogData &&
          blogData?.blog?.length > 0 &&
          blogData.blog.map((blog) => <Card blog={blog} key={blog._id} />)}
      </div>
    </section>
  );
};

export default FeaturedPost;
