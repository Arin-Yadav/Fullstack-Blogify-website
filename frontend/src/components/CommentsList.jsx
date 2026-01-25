import React from "react";
import { useFetch } from "../hooks/UseFetch";
import dayjs from "dayjs";

const CommentsList = ({ props }) => {
  const { data: commentsData } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/get-comments/${props.blogid}`,
    {
      withCredentials: true,
    },
  );
  // console.log(commentsData);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">
        Comments ({commentsData?.comments?.length || 0})
      </h1>

      {/* Comment Item */}
      <div className="space-y-6">
        {commentsData?.comments?.map((comment, index) => (
          <div
            key={index}
            className="shadow-sm rounded-lg p-4 flex flex-col gap-3">
            {/* User Info */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={comment.author.avatar}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <p className="font-medium text-gray-900">
                  {comment.author.fullName || "Anonymous"}
                </p>
              </div>
              <p className="text-sm">
                {dayjs(comment.createdAt).format("DD-MM-YYYY") || "Just now"}
              </p>
            </div>

            {/* Comment Content */}
            <div className="text-gray-800 leading-relaxed">
              {comment.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
