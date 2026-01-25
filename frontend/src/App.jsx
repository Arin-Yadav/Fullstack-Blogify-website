import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./pages/Signin";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteBlog,
  RouteBlogDetails,
  RouteCategoryDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignin,
  RouteSignup,
} from "./helpers/RouteName";
import Layout from "./Layout/Layout";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/Category/CategoryDetails";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";
import BlogDetails from "./pages/Blog/BlogDetails";
import AddBlog from "./pages/Blog/AddBlog";
import EditBlog from "./pages/Blog/EditBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={RouteProfile} element={<Profile />} />

          {/* Blog Category */}
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          <Route element={<ProtectedRoute />}>
            {/* Blog  */}
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteAddBlog} element={<AddBlog />} />
            <Route path={RouteEditBlog()} element={<EditBlog />} />
          </Route>
            <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} /> 
        </Route>

        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
