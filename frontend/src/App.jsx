import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./applicant/Home";
import Myprofile from "./applicant/Myprofile";
import CompaniesApplied from "./applicant/CompaniesApplied";
import ResumeRev from "./applicant/ResumeRev";
import MyCreatedJobs from "./recruiter/MycreatedJobs";
import CreateJob from "./recruiter/CreateJob";
import Sidebar from "./components/Sidebar";

// This component wraps authenticated routes
const AuthenticatedRoute = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        } />
        <Route path="/profile" element={
          <AuthenticatedRoute>
            <Myprofile />
          </AuthenticatedRoute>
        } />
        <Route path="/applied" element={
          <AuthenticatedRoute>
            <CompaniesApplied />
          </AuthenticatedRoute>
        } />
        <Route path="/review" element={
          <AuthenticatedRoute>
            <ResumeRev />
          </AuthenticatedRoute>
        } />





        <Route path="/mycreatedjobs" element={
          <AuthenticatedRoute>
            <MyCreatedJobs />
          </AuthenticatedRoute>
        } />
        <Route path="/create" element={
          <AuthenticatedRoute>
            <CreateJob />
          </AuthenticatedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;