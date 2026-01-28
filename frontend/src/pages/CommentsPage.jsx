import { Link } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch.js";
import LoadingSpinner from "../components/Loading.jsx";
import { deleteData } from "../helpers/DeleteData.js";
import { showToast } from "../helpers/ShowToast.js";
import { useState } from "react";
import dayjs from "dayjs";

const CommentsPage = () => {
  const [freshdata, setFreshdata] = useState(false);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/get-all-comments`,
    { withCredentials: true },
    [freshdata],
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${import.meta.env.VITE_API_URL}/comment/delete/${id}`,
    );
    if (response) {
      setFreshdata(!freshdata);
      showToast("success", "Comment deleted");
    } else {
      showToast("error", "Comment not deleted");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-screen p-5">
      {/* Category tables */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Blog
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Comment By
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Comment
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data && data.comments.length > 0 ? (
              data?.comments?.map((comment) => (
                <tr key={comment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {comment.blogid.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {comment.author.fullName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {dayjs(comment.createAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {comment.comment}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(comment._id)}
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

export default CommentsPage;
