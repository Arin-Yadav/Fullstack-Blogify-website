import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import { useFetch } from "../hooks/UseFetch";
import LoadingSpinner from "../components/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_API_URL}/user/get-user/${userDetails._id}`,
    { withCredentials: true },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   if (userData) {
  //     // Pre-fill form fields with fetched user data
  //     Object.keys(userData.user).forEach((key) => {
  //       if (key in userData.user) {
  //         // Set default values in the form
  //         register(key).onChange({ target: { value: userData.user[key] } });
  //       }
  //     });
  //   }
  // }, [userData]);

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        values,
        {
          withCredentials: true,
        },
      );
      showToast("success", "Saved changes!");
      dispatch(setUser(response.data.user));
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Error saving changes. Please try again.",
      );
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4">
      <div className="bg-gray-100 w-full max-w-3xl rounded-xl p-6 space-y-4">
        {/* avatar  */}
        <div className="flex justify-center">
          <img
            src={userData?.user?.avatar}
            alt="Avatar"
            className="w-44 h-44 rounded-full border-2 border-gray-700 object-cover cursor-pointer"
          />
        </div>
        {/* form  */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-xl p-6 space-y-4">
          {/* Full name  */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700">
              Fullname
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={userData?.user?.fullName}
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("fullName", {
                required: "Fullname is required",
              })}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email  */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder={userData?.user?.email}
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              type="text"
              placeholder={userData?.user?.bio}
              className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("bio", {
                required: "Bio is required",
              })}
            />
            {errors.bio && (
              <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors outline-none cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
