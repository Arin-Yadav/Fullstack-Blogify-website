import React from "react";
import { useFetch } from "../hooks/UseFetch";
import { decode } from "entities";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "../helpers/RouteName";

const RelatedBlog = ({ props }) => {
  // console.log(props)
  const { data } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-related-blog/${props.category}/${props.blogSlug}`,
    { withCredentials: true },
  );

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-bold text-2xl">Related Blogs</h1>
      {data && data.relatedBlog.length > 0 ? (
        data.relatedBlog.map((blog) => {
          return (
            <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg shadow-md bg-white">
                <img 
                  src={blog.featuredImage}
                  alt="blog-image"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <h1 className="font-semibold text-gray-800 text-center sm:text-left line-clamp-2">
                  {decode(blog.title)}
                </h1>
              </div>
            </Link>
          );
        })
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
};

export default RelatedBlog;
