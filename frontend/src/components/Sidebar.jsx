import { FaHome, FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaRegComments } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { RouteBlog, RouteCategoryDetails, RouteIndex } from "../helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import axios from "axios";
import { GrBlog } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
// import { useState } from "react";

export default function Sidebar() {
  // const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/signout`, {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate(RouteIndex);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <aside className="sticky top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-md flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link
          to={RouteIndex}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300">
          <IoHomeOutline className="mr-2" /> Home
        </Link>

        <Link
          to={RouteBlog}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300">
          <GrBlog className="mr-2" /> Blog
        </Link>

        <Link
          to={RouteCategoryDetails}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300">
          <BiCategory className="mr-2" /> Category
        </Link>
        
        <Link
          to={RouteIndex}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300">
          <LuUsers className="mr-2" /> Users
        </Link>

        <Link
          to={RouteIndex}
          className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e] transition-colors duration-300">
          <FaRegComments className="mr-2" /> Comments
        </Link>
      </nav>

      {/* Footer */}
      <div className="border-t px-4 py-4">
        {!user?.isLoggedIn ? (
          <Link
            to="/signin"
            className="w-full text-center body-font font-semibold cursor-pointer bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-3xl transition-transform hover:scale-105 block">
            Sign in
          </Link>
        ) : (
          <div className="flex gap-2 items-center">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.fullName}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 rounded cursor-pointer" />
            )}
            <button
              type="submit"
              onClick={handleSignout}
              className="flex gap-2 items-center  w-full px-4 py-2 text-left text-sm text-white bg-red-500 hover:bg-red-600 hover:text-white rounded cursor-pointer">
              <FaSignOutAlt className="w-5 h-5" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
