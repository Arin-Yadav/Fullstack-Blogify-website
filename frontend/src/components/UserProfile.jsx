import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import { FaRegUserCircle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

export default function UserProfileDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignout = async () => {
    try {
      // await axios.get(`${import.meta.env.VITE_API_URL}/auth/signout`, {
      //   withCredentials: true,
      // });
      localStorage.removeItem("token");
      window.location.reload();
      navigate(RouteIndex);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none">
        <FaRegUserCircle className="w-8 h-8 rounded-full" />
        <span className="font-medium">John Doe</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={handleSignout}
                className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
