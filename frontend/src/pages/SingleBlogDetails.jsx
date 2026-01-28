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
    <div className="px-4 md:px-8 lg:px-12 py-8">
      {blogData?.blog && (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Blog Section */}
          <div className="lg:w-2/3 w-full space-y-8">
            {/* Title */}
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900 leading-tight">
              {blogData.blog.title}
            </h1>

            {/* Author + Meta */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
              <img
                src={blogData.blog.author.avatar}
                alt="author avatar"
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {blogData.blog.author.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  {dayjs(blogData.blog.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={blogData.blog.featuredImage}
                alt="blog"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none text-gray-800 leading-relaxed bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold">{blogData.blog.title} :</h3>
              {decode(blogData.blog.blogcontent)}
            </div>

            {/* Comments */}
            <div className="w-full">
              <Comments props={{ blogid: blogData.blog._id }} />
            </div>
          </div>

          {/* Sidebar Section */}
          <aside className="lg:w-1/3 w-full border-t-2 lg:border-t-0 lg:border-l-2 p-4">
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
