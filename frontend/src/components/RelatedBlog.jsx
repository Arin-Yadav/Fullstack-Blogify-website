import React from "react";
import { useFetch } from "../hooks/UseFetch";
import { decode } from "entities";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "../helpers/RouteName";

const RelatedBlog = ({ props }) => {
  const { data } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-related-blog/${props.category}/${props.blogSlug}`,
    { withCredentials: true }
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* Header */}
      <h2 className="font-bold text-2xl text-gray-900 border-b pb-3">
        Related Blogs
      </h2>

      {/* Related Blogs List */}
      {data && data?.relatedBlog?.length > 0 ? (
        <div className="space-y-4">
          {data.relatedBlog.map((blog) => (
            <Link
              key={blog?._id}
              to={RouteBlogDetails(props.category, blog.slug)}
              className="block"
            >
              <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
                {/* Thumbnail */}
                <img
                  src={blog?.featuredImage}
                  alt={blog?.title}
                  className="w-20 h-20 object-cover rounded-md shrink-0"
                />

                {/* Title */}
                <h3 className="font-semibold text-gray-800 line-clamp-2">
                  {decode(blog?.title)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No related blogs found.</p>
      )}
    </div>
  );
};

export default RelatedBlog;
