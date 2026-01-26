import React, { useState } from "react";
import { RouteAddBlog, RouteEditBlog } from "../../helpers/RouteName";
import { Link } from "react-router-dom";
import { deleteData } from "../../helpers/DeleteData";
import { showToast } from "../../helpers/ShowToast";
import { useFetch } from "../../hooks/UseFetch";
import LoadingSpinner from "../../components/Loading";
import dayjs from 'dayjs';

const BlogDetails = () => {
  const [freshdata, setFreshdata] = useState(false);

  const {
    data: blogData,
    loading,
    _error,
  } = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/get-all`,
    {
      withCredentials: true,
    },
    [freshdata],
  );

  const handleDelete = (id) => {
    const response = deleteData(
      `${import.meta.env.VITE_API_URL}/blog/delete/${id}`,
    );
    if (response) {
      setFreshdata(!freshdata);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted");
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="min-h-[calc(100vh-4rem)] p-5">
      <div className="inline-block">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition-colors  cursor-pointer">
          <Link to={RouteAddBlog}>Add Blog</Link>
        </button>
      </div>

      {/* Category tables */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Author
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Category Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Slug
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Dated
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {blogData && blogData.blog.length > 0 ? (
              blogData?.blog?.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {blog.author.fullName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {blog.category.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {blog.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {blog.slug}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {dayjs(blog.createdAt).format('DD-MM-YYYY')}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                        <Link to={RouteEditBlog(blog._id)}>Edit</Link>
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p>No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogDetails;
