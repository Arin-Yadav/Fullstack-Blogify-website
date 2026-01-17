import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from './pages/Home'
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./pages/Signin";
import { RouteIndex, RouteProfile, RouteSignin, RouteSignup } from "./helpers/RouteName";
import Layout from "./Layout/Layout";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path={RouteProfile} element={<Profile />} />
        </Route>
        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
