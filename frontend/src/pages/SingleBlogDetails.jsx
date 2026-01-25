import dayjs from "dayjs";
import LoadingSpinner from "../components/Loading";
import { useFetch } from "../hooks/UseFetch";
import { useParams } from "react-router-dom";
import { decode } from "entities";

const SingleBlogDetails = () => {
  const { blogSlug } = useParams();
  const { data: blogData, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-blog/${blogSlug}`,
    {
      withCredentials: true,
    }
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 md:px-10 py-8">
      {blogData?.blog && (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Blog Section */}
          <div className="lg:w-2/3 w-full space-y-6">
            {/* Title */}
            <h1 className="font-bold text-2xl md:text-4xl text-gray-900">
              {blogData.blog.title}
            </h1>

            {/* Author + Meta */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-amber-200 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={blogData.blog.author.avatar}
                  alt="author avatar"
                  className="h-16 w-16 rounded-full object-cover border border-gray-300"
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
              <div className="flex gap-4 text-sm font-medium text-gray-700">
                <button className="hover:text-blue-600 transition">👍 Like</button>
                <button className="hover:text-green-600 transition">💬 Comment</button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={blogData.blog.featuredImage}
                alt="blog"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed">
              {decode(blogData.blog.blogcontent)}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:w-1/3 w-full border-t-2 lg:border-t-0 lg:border-l-2 p-4">
            <h2 className="font-semibold text-lg mb-4">Related Posts</h2>
            <p className="text-gray-600 text-sm">
              You can show related blogs, categories, or ads here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlogDetails;
