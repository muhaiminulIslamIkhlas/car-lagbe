import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import DriverRegistration from "../pages/DriverRegistration";
import PrivateRoute from "../components/Layout/PrivateRoute";
import Dashboard from "../pages/admin/Dashboard";
import Forbidden from "../components/UI/Login";
import PublicRoute from "../components/Layout/PublicRoute";
import Requests from "../pages/admin/Requests";
import DriverRequest from "../pages/admin/DriverRequest";
import DetailsDriver from "../pages/admin/DetailsDriver";
import AllDriver from "../pages/admin/AllDriver";
import Bids from "../pages/Bids";
import AllRide from "../pages/AllRide";
import AllRequest from "../pages/AllRequest";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
      <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
      <Route path="/cars" element={<PublicRoute><CarListing /></PublicRoute>} />
      <Route path="/cars/:slug" element={<PublicRoute><CarDetails /></PublicRoute>} />
      <Route path="/blogs" element={<PublicRoute><Blog /></PublicRoute>} />
      <Route path="/blogs/:slug" element={<PublicRoute><BlogDetails /></PublicRoute>} />
      <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
      <Route path="/forbidden" element={<PublicRoute><Forbidden /></PublicRoute>} />
      <Route path="/driver-registration" element={<PublicRoute><DriverRegistration /></PublicRoute>} />
      <Route path="/ride-bids/:journeyId" element={<PrivateRoute role={[2, 3]}><Bids /></PrivateRoute>} />
      <Route path="/all-ride/:customerId" element={<PrivateRoute role={[2]}><AllRide /></PrivateRoute>} />
      <Route path="/all-request/:driverId" element={<PrivateRoute role={[3]}><AllRequest /></PrivateRoute>} />
      <Route path="admin">
        <Route index element={<PrivateRoute role={[1]} type="dashboard"><Dashboard /></PrivateRoute>} />
        <Route path="all-driver" element={<PrivateRoute role={[1]} type="dashboard"><AllDriver /></PrivateRoute>} />
        <Route path="requests" element={<PrivateRoute role={[1]} type="dashboard"><Requests /></PrivateRoute>} />
        <Route path="driver/requests" element={<PrivateRoute role={[1]} type="dashboard"><DriverRequest /></PrivateRoute>} />
        <Route path="driver/details/:id" element={<PrivateRoute role={[1]} type="dashboard"><DetailsDriver /></PrivateRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
