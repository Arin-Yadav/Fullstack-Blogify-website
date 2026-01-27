import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import LoadingSpinner from "../../components/Loading";
import Card from "../../components/Card";
import { TbCategory } from "react-icons/tb";

const BlogByCategory = () => {
  const { categorySlug } = useParams();
  const { data: blogData, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-blog-by-category/${categorySlug}`,
    { withCredentials: true },
    [categorySlug],
  );

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <div className="p-5">
        <div className="flex gap-2 items-center text-2xl font-bold w-full border-b pb-3">
          <TbCategory />
          {blogData?.categoryData.name}
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
    </>
  );
};

export default BlogByCategory;
