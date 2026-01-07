import { useState } from "react";
import axios from "axios";

const EditBlogModal = ({ blog, onClose, onUpdated }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // const res = await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${blog._id}`, {
      await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${blog._id}`, {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdated(); // refresh blog list
      onClose();   // close modal
    } catch (err) {
      console.error("Update failed:", err.response?.data?.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Blog</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-32 mb-3"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogModal;
