import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import EditBlogModal from "../components/EditBlogModal";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogs(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err.response?.data?.error);
    }
  };

  // edit modal
  const [editingBlog, setEditingBlog] = useState(null);

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
  };

  const closeModal = () => {
    setEditingBlog(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Blogs</h2>
      <BlogForm onBlogCreated={fetchBlogs} />
      <ul className="mt-6 space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 rounded space-y-2">
            <h3 className="font-semibold text-lg">{blog.title}</h3>
            <p className="text-gray-700">{blog.content}</p>

            {/* ✅ Button Row */}
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => handleEditClick(blog)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={closeModal}
          onUpdated={fetchBlogs}
        />
      )}
    </div>
  );
};

export default Dashboard;
