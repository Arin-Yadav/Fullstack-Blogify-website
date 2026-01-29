import { useState } from "react";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";

const BlogForm = ({ onBlogCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setContent("");
      onBlogCreated(res.data);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Something went wrong, Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-32"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Publish Blog
      </button>
    </form>
  );
};

export default BlogForm;
