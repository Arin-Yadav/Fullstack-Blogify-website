import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteProfile } from "../helpers/RouteName";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaRegUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";

export default function DesktopUserProfile({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user)
  const handleSignout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/signout`, {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", response.data.message)
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
          {/* {user.photoUrl ? ( */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 rounded" />
          )}
          <RiArrowDropDownLine className="w-8 h-8" />
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
                <div className="flex flex-col">
                  <span className="font-medium">{user.fullName}</span>
                  <span className="text-sm">{user.email}</span>
                </div>
              </Link>
            </MenuItem>
            <div className="border-t">
              <MenuItem>
                <Link
                  to="/profile"
                  className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                  <FaRegUser />
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="#"
                  className="flex gap-2 items-center  px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                  <IoSettingsOutline />
                  Settings
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  type="submit"
                  onClick={handleSignout}
                  className="flex gap-2 items-center  w-full px-4 py-2 text-left text-sm text-white bg-red-500 hover:bg-red-600 hover:text-white rounded cursor-pointer">
                  <IoLogOutOutline className="w-5 h-5" />
                  Sign out
                </button>
              </MenuItem>
            </div>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
