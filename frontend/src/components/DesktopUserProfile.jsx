import { Link, useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";

export default function DesktopUserProfile({ user }) {
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
    <div className="relative inline-block text-left">
      <Menu>
        {/* Profile Button */}
        <MenuButton className="flex items-center cursor-pointer space-x-2 rounded-md px-5 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none">
          {/* User photo (fallback to icon if no photo) */}
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-6 h-6 rounded" />
          )}
          <span className="font-medium">{user.fullName}</span>
          <RiArrowDropDownLine className="w-5 h-5" />
        </MenuButton>

        {/* Dropdown Menu */}
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
          <div className="py-1">
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                type="submit"
                onClick={handleSignout}
                className="block w-full px-4 py-2 text-left text-sm text-white bg-red-500 hover:bg-red-600 hover:text-white rounded cursor-pointer">
                Sign out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
