import dayjs from "dayjs";
import LoadingSpinner from "../components/Loading";
import { useFetch } from "../hooks/UseFetch";
import { useParams } from "react-router-dom";
import { decode } from "entities";
import Comments from "../components/Comments";
import RelatedBlog from "../components/RelatedBlog";

const SingleBlogDetails = () => {
  const { blogSlug, categorySlug } = useParams();
  const { data: blogData, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-blog/${blogSlug}`,
    { withCredentials: true },
    [blogSlug, categorySlug],
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 md:px-6 lg:px-12 py-10 bg-gray-50">
      {blogData?.blog && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Blog Section */}
          <div className="lg:w-2/3 w-full space-y-6">
            {/* Title */}
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900 leading-tight border-b pb-3">
              {blogData?.blog?.title}
            </h1>

            {/* Author + Meta */}
            <div className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4">
              {blogData?.blog?.author?.avatar ? (
                <img
                  src={blogData?.blog?.author?.avatar}
                  alt="author avatar"
                  className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-green-600">
                  {blogData?.blog?.author?.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {blogData?.blog?.author?.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {dayjs(blogData?.blog?.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <img
              src={blogData?.blog?.featuredImage}
              alt="blog"
              className="w-full h-72 md:h-112 object-cover rounded-lg shadow-md"
            />

            {/* Blog Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-gray-800 leading-relaxed">
              {decode(blogData?.blog?.blogcontent)}
            </div>

            {/* Comments */}
            <Comments props={{ blogid: blogData?.blog?._id }} />
          </div>

          {/* Sidebar Section */}
          <aside className="lg:w-1/3 w-full lg:border-l lg:pl-6 mt-8 lg:mt-0">
            <RelatedBlog
              props={{ category: categorySlug, blogSlug: blogSlug }}
            />
          </aside>
        </div>
      )}
    </div>
  );
};

export default SingleBlogDetails;
