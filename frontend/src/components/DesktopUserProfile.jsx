import { Link, useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";

export default function DesktopUserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/signout`,
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", response.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        {/* Profile Button */}
        <MenuButton
          className="flex items-center gap-2 rounded-md px-4 py-2 
                     bg-gray-100 hover:bg-gray-200 focus:outline-none 
                     focus:ring-2 focus:ring-teal-500 transition"
        >
          {user.user.avatar ? (
            <img
              src={user.user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-600" />
          )}
          <RiArrowDropDownLine className="w-6 h-6 text-gray-600" />
        </MenuButton>

        {/* Dropdown Menu */}
        <MenuItems
          transition
          className="absolute right-0 mt-2 w-56 origin-top-right 
                     rounded-md bg-white shadow-lg ring-1 ring-black/5 
                     focus:outline-none 
                     data-closed:scale-95 data-closed:opacity-0 
                     data-enter:duration-150 data-leave:duration-100"
        >
          <div className="py-2">
            {/* User Info */}
            <MenuItem>
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-semibold">{user.user.fullName}</p>
                <p className="text-xs text-gray-500">{user.user.email}</p>
              </div>
            </MenuItem>

            {/* Profile Link */}
            <MenuItem>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm 
                           text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <FaRegUser />
                Profile
              </Link>
            </MenuItem>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Auth Actions */}
          <div className="px-4 py-3">
            {!user.isLoggedIn ? (
              <Link
                to="/signin"
                className="block w-full text-center font-semibold 
                           bg-teal-600 hover:bg-teal-700 text-white 
                           px-5 py-2 rounded-md transition"
              >
                Sign in
              </Link>
            ) : (
              <button
                onClick={handleSignout}
                className="block w-full text-sm font-medium 
                           bg-red-600 hover:bg-red-700 text-white 
                           px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            )}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
