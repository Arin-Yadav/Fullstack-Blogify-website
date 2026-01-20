import { Link } from "react-router-dom";
import { RouteAddCategory, RouteDeleteCategory, RouteEditCategory } from "../../helpers/RouteName";
import { useFetch } from "../../hooks/UseFetch.js";
import LoadingSpinner from "../../components/Loading.jsx";
import { deleteData } from "../../helpers/DeleteData.js";
import { showToast } from "../../helpers/ShowToast.js";
import { useState } from "react";

const CategoryDetails = () => {
  const [freshdata, setFreshdata] = useState(false)

  const {
    data: categoryData,
    loading,
    _error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/category/all-category`, {
    withCredentials: true,
  }, [freshdata]);

  const handleDelete = (id) => {
      const response = deleteData(`${import.meta.env.VITE_API_URL}/category/delete/${id}`)
      if(response) {
        setFreshdata(!freshdata)
        showToast('success', "Data deleted")
      }
      else {
        showToast('error', "Data not deleted")
      }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-5">
      <div className="inline-block">
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition-colors  cursor-pointer">
          <Link to={RouteAddCategory}>Add Category</Link>
        </button>
      </div>

      {/* Category tables */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 mt-5">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Slug
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categoryData && categoryData.category.length > 0 ? (
                categoryData?.category?.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {category.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                          <Link to={RouteEditCategory(category._id)}>
                          Edit
                          </Link>
                        </button>
                        <button 
                        onClick={() => handleDelete(category._id)}
                        className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td>
                  <p>No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryDetails;
