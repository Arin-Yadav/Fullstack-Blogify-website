import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export default function MobileuserProfile({ username = "John Doe", email = "johndoe@email.com" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="relative sm:hidden">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none w-full"
      >
        <FaRegUserCircle className="w-6 h-6" />
        <span className="font-medium">{username}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-50">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 px-4 py-3 border-b">
            <FaRegUserCircle className="w-10 h-10 text-gray-500" />
            <div>
              <p className="font-semibold text-sm">{username}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>

          {/* Links */}
          <ul className="py-1">
            <li>
              <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                👤 Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                ⚙️ Settings
              </Link>
            </li>
            <li>
              <Link to="/write" className="block px-4 py-2 text-sm hover:bg-gray-100">
                ➕ Write Blog
              </Link>
            </li>
            <li>
              <Link to="/archive" className="block px-4 py-2 text-sm hover:bg-gray-100">
                📚 Archive
              </Link>
            </li>
            <li>
              <Link to="/authors" className="block px-4 py-2 text-sm hover:bg-gray-100">
                ✍️ Authors
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignout}
                className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
