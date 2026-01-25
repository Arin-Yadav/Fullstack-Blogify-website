import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { showToast } from "../../helpers/ShowToast";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import LoadingSpinner from "../../components/Loading";

const EditCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { category_id } = useParams();
  const {
    data: categoryData,
    loading,
    _error,
  } = useFetch(
    `${import.meta.env.VITE_API_URL}/category/show/${category_id}`,
    {
      withCredentials: true,
    },
    [category_id],
  );

  const onSubmit = async (values) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/category/update/${category_id}`,
        values,
        { withCredentials: true },
      );
      showToast("success", response.data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Something went wrong, Please try again.",
      );
    }
  };

  const categoryValue = watch("name");
  useEffect(() => {
    if (categoryValue) {
      const slug = slugify(categoryValue, { lower: true });
      setValue("slug", slug);
    }
  }, [categoryValue]);

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData.category.name);
      setValue("slug", categoryData.category.slug);
    }
  }, [categoryData]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="h-full w-full py-10 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="font-bold">Edit Category</h1>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="flex flex-col">
          <label htmlFor="slug" className="text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            placeholder="Enter your slug"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("slug", {
              required: "Slug is required",
            })}
          />
          {errors.slug && (
            <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>
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
  );
};

export default EditCategory;
