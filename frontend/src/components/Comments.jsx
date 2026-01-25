import { useForm } from "react-hook-form";
import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = ({ props }) => {
  const user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    if (!user?.isLoggedIn) {
      // 🚫 Block submission and show message
      showToast("error", "Please sign in to comment.");
      return;
    }

    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        author: user.user._id,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment/create`,
        newValues,
        { withCredentials: true },
      );
      reset({ comment: "" }); // clear only the comment field
      showToast("success", response.data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Error saving changes. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" bg-white shadow-lg rounded-xl p-6 space-y-2">
      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          {...register("comment", { required: "Comment cannot be empty" })}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-300"
          rows="4"
          placeholder="Write your comment..."
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors outline-none cursor-pointer">
        Submit
      </button>
    </form>
  );
};

export default Comments;
