import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { showToast } from "../../helpers/ShowToast";
import { FaChevronDown } from "react-icons/fa";
import { useFetch } from "../../hooks/UseFetch";
import Dropzone from "react-dropzone";
import Editor from "../../components/Editor";

const AddCategory = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  // const [open, setOpen] = useState(false);
  //   const [selected, setSelected] = useState(categories[0]);
  const {
    data: categoryData,
    loading,
    _error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/category/all-category`, {
    withCredentials: true,
  });

  //   console.log(categoryData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    setValue("blogcontent", data);
  };

  const onSubmit = async (values) => {
    console.log(values);
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_API_URL}/category/add`,
    //     values,
    //     { withCredentials: true },
    //   );
    //   reset();
    //   showToast("success", response.data.message);
    // } catch (error) {
    //   showToast(
    //     "error",
    //     error.response?.data?.message ||
    //       "Something went wrong, Please try again.",
    //   );
    // }
  };

  const categoryValue = watch("title");
  useEffect(() => {
    if (categoryValue) {
      const slug = slugify(categoryValue, { lower: true });
      setValue("slug", slug);
    }
  });

  return (
    <div className="h-full w-full flex justify-center py-5 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white shadow-lg rounded-xl p-6 space-y-2">
        {/* Select category  */}
        <div className="w-full mx-auto">
          <label
            htmlFor="options"
            className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="options"
            defaultValue=""
            onChange={(e) => setValue("category", e.target.value)}
            className="block w-full rounded-md border border-gray-300 shadow-sm  focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm p-2 bg-white cursor-pointer  max-h-40 overflow-y-auto">
            <option value="" disabled>
              Select a category
            </option>
            {categoryData?.category?.map((category, idx) => (
              <option key={idx} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
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

        {/* Profile */}
        <div className="flex flex-col">
          <label htmlFor="slug" className="text-sm font-medium text-gray-700">
            Featured Image
          </label>
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="flex justify-center sm:justify-start w-full sm:w-auto">
                <div {...getRootProps()} className="relative cursor-pointer">
                  <input {...getInputProps()} />
                  <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed mt-2 rounded object-cover">
                    <img src={filePreview} alt="image" />
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        {/* Blog content */}
        <div className="flex flex-col">
          <label
            htmlFor="blogcontent"
            className="text-sm font-medium text-gray-700">
            Blog Content
          </label>
          <div
            className="mt-3"
            {...register("blogcontent", {
              required: "Blog content is required",
            })}>
            <Editor props={{ initialData: "" }} onChange={handleEditorData} />
          </div>
          {errors.blogcontent && (
            <p className="text-xs text-red-500 mt-1">
              {errors.blogcontent.message}
            </p>
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

export default AddCategory;
