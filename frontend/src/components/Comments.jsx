import { useForm } from "react-hook-form";
import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import CommentsList from "./CommentsList";

const Comments = ({ props }) => {
  const user = useSelector((state) => state.user);
  const [latestComment, setLatestComment] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    if (!user?.isLoggedIn) {
      showToast("error", "You must be signed in to post a comment.");
      return;
    }

    try {
      const newValues = { ...values, blogid: props.blogid };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment/create`,
        newValues,
        { withCredentials: true },
      );

      setLatestComment(response.data.comment);
      reset({ comment: "" });
      showToast(
        "success",
        response.data.message || "Comment added successfully!",
      );
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm mt-8">
      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add a Comment
          </label>
          <textarea
            {...register("comment", { required: "Comment cannot be empty" })}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 
                       focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            rows="4"
            placeholder="Write your comment..."
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
          Post Comment
        </button>
      </form>

      {/* Comment List */}
      <div className="border-t border-gray-200 p-6">
        <CommentsList
          props={{ blogid: props.blogid, newComments: latestComment }}
        />
      </div>
    </div>
  );
};

export default Comments;
