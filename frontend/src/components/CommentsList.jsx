import React from "react";
import { useFetch } from "../hooks/UseFetch";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const CommentsList = ({ props }) => {
  const user = useSelector((state) => state.user);
  const { data: commentsData } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/get-comments/${props.blogid}`,
    { withCredentials: true }
  );

  const totalComments = props.newComments
    ? (commentsData?.comments?.length || 0) + 1
    : commentsData?.comments?.length || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 flex items-center">
        Comments
        <span className="text-gray-500 pl-2 text-lg">({totalComments})</span>
      </h2>

      {/* Comments */}
      <div className="space-y-6">
        {/* Optimistic new comment */}
        {props.newComments && (
          <div className="bg-white shadow-md rounded-lg p-4 border border-blue-100 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={user?.user?.avatar}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <p className="font-semibold text-gray-900">
                  {user?.user?.fullName || "Anonymous"}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {dayjs(props.newComments.createdAt).format("DD MMM YYYY") ||
                  "Just now"}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed wrap-break-word">
              {props.newComments.comment}
            </p>
          </div>
        )}

        {/* Existing comments from API */}
        {commentsData?.comments?.map((comment, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={comment?.author?.avatar}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <p className="font-semibold text-gray-900">
                  {comment?.author?.fullName || "Anonymous"}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {dayjs(comment?.createdAt).format("DD MMM YYYY") || "Just now"}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed wrap-break-word">
              {comment?.comment}
            </p>
          </div>
        ))}

        {/* Empty state */}
        {!commentsData?.comments?.length && !props.newComments && (
          <p className="text-gray-500 text-center italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
