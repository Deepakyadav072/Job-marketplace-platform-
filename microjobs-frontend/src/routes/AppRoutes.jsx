import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home.jsx";
import ExploreJobs from "../pages/ExploreJobs.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import ApplyJob from "../pages/ApplyJob.jsx";
import Profile from "../pages/Profile.jsx";
import PostJob from "../pages/PostJob.jsx";
import MyOrder from "../pages/MyOrder.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";

import ClientDashboard from "../pages/ClientDashboard.jsx";
import Applicants from "../pages/Applicants.jsx";
import AcceptedJobs from "../pages/AcceptedJobs.jsx";
import MyPostedJobs from "../pages/MyPostedJob.jsx";
import Dashboard from "../pages/Dashboard.jsx";
const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Freelancer Routes */}
    <Route path="/explore-jobs" element={
      <ProtectedRoute role="freelancer">
        <ExploreJobs />
      </ProtectedRoute>
    } />
    <Route path="/job/:id" element={
      <ProtectedRoute>
        <JobDetails />
      </ProtectedRoute>
    } />
    <Route path="/apply/:id" element={
      <ProtectedRoute role="freelancer">
        <ApplyJob />
      </ProtectedRoute>
    } />
    <Route path="/my-orders" element={
      <ProtectedRoute role="freelancer">
        <MyOrder />
      </ProtectedRoute>
    } />
    <Route path="/accepted-jobs" element={
      <ProtectedRoute role="freelancer">
        <AcceptedJobs />
      </ProtectedRoute>
    } />

    {/* Client Routes */}
    <Route path="/dashboard" element={
      <ProtectedRoute role="client">
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/post-job" element={
      <ProtectedRoute role="client">
        <PostJob />
      </ProtectedRoute>
    } />
    <Route path="/applicants/:jobId" element={
      <ProtectedRoute role="client">
        <Applicants />
      </ProtectedRoute>
    } />

    
    {/* Profile for any logged in user */}
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
<Route path="/my-jobs" element={<MyPostedJobs />} />
    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;