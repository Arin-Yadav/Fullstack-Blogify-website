import { LuUsers } from "react-icons/lu";
import { FaRegComments } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteComments,
  RouteIndex,
  RouteProfile,
  RouteUsers,
} from "../helpers/RouteName";
import { GrBlog } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { useFetch } from "../hooks/UseFetch";
import { FaRegCircle, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import { showToast } from "../helpers/ShowToast";
import axios from "axios";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { data: categoryData } = useFetch(
    `${import.meta.env.VITE_API_URL}/category/all-category`,
    { withCredentials: true },
  );

  const handleSignout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/signout`,
        { withCredentials: true },
      );
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", response.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-16 md:top-16 left-0 h-full md:h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-md flex flex-col transform transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            to={RouteIndex}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
            <IoHomeOutline className="mr-2" /> Home
          </Link>

          {user && user.isLoggedIn ? (
            <>
              <Link
                to={RouteBlog}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                <GrBlog className="mr-2" /> Blog
              </Link>
              <Link
                to={RouteComments}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                <FaRegComments className="mr-2" /> Comments
              </Link>
            </>
          ) : (
            <></>
          )}

          {user && user.isLoggedIn && user.user.role === "admin" ? (
            <>
              <Link
                to={RouteCategoryDetails}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                <BiCategory className="mr-2" /> Category
              </Link>

              <Link
                to={RouteUsers}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                <LuUsers className="mr-2" /> Users
              </Link>
            </>
          ) : (
            <></>
          )}

          {/* Categories Section BELOW Comments */}
          <div className="mt-4 border-t border-gray-200 pt-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Categories
            </h2>
            <div className="space-y-1">
              {categoryData?.category?.length > 0 &&
                categoryData.category.map((category) => (
                  <Link
                    key={category._id}
                    to={RouteBlogByCategory(category.slug)}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                    <span className="flex items-center gap-2">
                      <FaRegCircle className="h-2 w-2" /> {category.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </nav>

        {/* Auth Buttons */}
        <div className="md:hidden px-4 py-3 border-t border-gray-200">
          {!user.isLoggedIn ? (
            <Link
              to="/signin"
              className="w-full block text-center font-semibold bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-md">
              Sign in
            </Link>
          ) : (
            <button
              onClick={handleSignout}
              className="w-full block text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
              Logout
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
