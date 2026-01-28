import { Link, useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";

export default function DesktopUserProfile({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Profile Menu */}
        <Menu>
          <MenuButton className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full focus:outline-none ring-1 ring-green-600 transition">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
              />
            ) : (
              <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600" />
            )}
          </MenuButton>

          {/* Dropdown Menu */}
          <div className="relative">
            <MenuItems
              transition
              className="absolute right-0 top-10 w-48 sm:w-56 
               rounded-md bg-white shadow-lg ring-1 ring-black/5 
               focus:outline-none 
               data-closed:scale-95 data-closed:opacity-0 
               data-enter:duration-150 data-leave:duration-100">
              <div className="py-2">
                {/* User Info */}
                <MenuItem>
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <p className="font-semibold truncate">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </MenuItem>

                {/* Profile Link */}
                <MenuItem>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm 
                         text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition">
                    <FaRegUser />
                    Profile
                  </Link>
                </MenuItem>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Auth Actions */}
              <div className="px-4 py-3">
                {user ? (
                  <button
                    onClick={handleSignout}
                    className="block w-full text-sm font-medium 
                         bg-red-600 hover:bg-red-700 text-white 
                         px-4 py-2 rounded-md transition">
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="block w-full text-center font-semibold 
                         bg-teal-600 hover:bg-teal-700 text-white 
                         px-5 py-2 rounded-md transition">
                    Sign in
                  </Link>
                )}
              </div>
            </MenuItems>
          </div>
        </Menu>
      </div>
    </div>
  );
}
