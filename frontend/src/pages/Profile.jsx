import { showToast } from "../helpers/ShowToast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../redux/slices/user.slice";
import { useFetch } from "../hooks/UseFetch";
import LoadingSpinner from "../components/Loading";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: userData,
    loading,
    error: _error,
    // error,
  } = useFetch(
    `${import.meta.env.VITE_API_URL}/user/get-user/${userDetails._id}`,
    { withCredentials: true },
  );
  // console.log(userData?.user) // to check userdata

  useEffect(() => {
    if (userData && userData.success) {
      reset({
        fullName: userData.user.fullName,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update-user/${userData.user._id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      // console.log(userData?.user._id) // to check userdata
      // dispatch(setUser(response.data.user));
      showToast("success", response.data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Error saving changes. Please try again.",
      );
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4">
      <div className="bg-gray-100 w-full max-w-3xl rounded-xl p-6 space-y-4">
        {/* avatar  */}
        {/* file selection or uploading using react dropzone  */}
        <Dropzone
          onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex justify-center">
                  <img
                    src={filePreview ? filePreview : userData?.user?.avatar}
                    alt="Avatar"
                    className="w-44 h-44 rounded-full border-2 border-gray-700 object-cover cursor-pointer"
                  />
                </div>
              </div>
            </section>
          )}
        </Dropzone>

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
              placeholder="Enter your fullname"
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
              placeholder="Enter your email"
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
              placeholder="Enter your bio here..."
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
