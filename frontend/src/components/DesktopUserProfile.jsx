import { Link, useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaRegUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
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
        {
          withCredentials: true,
        },
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
        <MenuButton className="flex items-center cursor-pointer space-x-2 rounded-md px-5 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none">
          {/* User photo (fallback to icon if no photo) */}
          {user.user.avatar ? (
            <img
              src={user.user.avatar}
              alt="image"
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
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                <div className="flex flex-col">
                  <span className="font-medium">{user.user.fullName}</span>
                  <span className="text-sm">{user.user.email}</span>
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
            </div>
          </div>
        </MenuItems>
      </Menu>
      
    </div>
  );
}
