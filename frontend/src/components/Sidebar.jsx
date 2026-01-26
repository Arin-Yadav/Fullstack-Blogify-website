import { LuUsers } from "react-icons/lu";
import { FaRegComments, FaRegUser } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteIndex,
} from "../helpers/RouteName";
import { GrBlog } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { useFetch } from "../hooks/UseFetch";
import { FaRegCircle, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
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
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white border border-gray-300 shadow-md"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
      </button>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-full md:h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-md flex flex-col transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Profile Dropdown */}
        <Menu as="div" className="relative px-4 py-3 border-b border-gray-200">
          <MenuButton className="flex items-center w-full cursor-pointer space-x-2 rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none">
            {user.user?.avatar ? (
              <img
                src={user.user.avatar}
                alt="avatar"
                className="w-20 h-7 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-gray-500" />
            )}
            <span className="flex-1 text-left font-medium text-gray-700 truncate">
              {user.user?.fullName || "Guest"}
            </span>
            <RiArrowDropDownLine className="w-6 h-6 text-gray-500" />
          </MenuButton>

          <MenuItems className="absolute left-4 right-4 mt-2 w-[calc(100%-2rem)] origin-top rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <div className="px-4 py-2 text-sm text-gray-700">
                  <div className="flex flex-col">
                    <span className="font-medium">{user.user?.fullName}</span>
                    <span className="text-xs text-gray-500">
                      {user.user?.email}
                    </span>
                  </div>
                </div>
              </MenuItem>
              <div className="border-t">
                <MenuItem>
                  <Link
                    to="/profile"
                    className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaRegUser /> Profile
                  </Link>
                </MenuItem>
              </div>
            </div>
          </MenuItems>
        </Menu>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link
            to={RouteIndex}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
            <IoHomeOutline className="mr-2" /> Home
          </Link>

          <Link
            to={RouteBlog}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
            <GrBlog className="mr-2" /> Blog
          </Link>

          <Link
            to={RouteCategoryDetails}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
            <BiCategory className="mr-2" /> Category
          </Link>

          <Link
            to={RouteIndex}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
            <LuUsers className="mr-2" /> Users
          </Link>

          <Link
            to={RouteIndex}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
            <FaRegComments className="mr-2" /> Comments
          </Link>

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
        <div className="px-4 py-3 border-t border-gray-200">
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
