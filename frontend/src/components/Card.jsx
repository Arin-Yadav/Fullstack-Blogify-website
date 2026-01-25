import dayjs from "dayjs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "../helpers/RouteName";

const Card = ({ blog }) => {
  return (
    <Link to={RouteBlogDetails(blog.category.slug, blog.slug)}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col">
        {/* Featured Image */}
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-60 object-cover"
        />

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category + Views */}
          <div className="flex justify-between items-center text-gray-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wide">
              {blog.category?.name}
            </span>
          </div>

          {/* Title */}
          <div className="space-y-2 mb-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">
              {blog.title}
            </h2>
            {/* <p className="text-sm text-gray-700 line-clamp-3">
            {blog.blogcontent}
          </p> */}
          </div>

          {/* Author + Date pinned at bottom */}
          <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
            <div className="flex items-center gap-2">
              {blog.author?.avatar ? (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-20 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-700">
                  {blog.author?.name?.charAt(0)}
                </div>
              )}
              <span className="font-medium">{blog.author?.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <IoCalendarNumberOutline />
              {dayjs(blog.date).format("DD-MMM-YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
