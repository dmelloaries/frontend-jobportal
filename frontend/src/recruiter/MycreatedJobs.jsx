import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageDialog from "./MessageDialog";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  ChevronLeft,
  Loader,
  Users,
  Mail,
} from "lucide-react";

const MyCreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const fetchCreatedJobs = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("No token found, please login.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/recruiter/mycreatedjobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch created jobs.");
        setLoading(false);
      }
    };
    fetchCreatedJobs();
  }, []);

  const fetchApplicants = async (jobId) => {
    setLoadingApplicants(true);
    setShowContent(false);
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recruiter/applicants/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplicants(response.data.applicants);
      setSelectedJob(response.data.job);
      setLoadingApplicants(false);
    } catch (error) {
      setError("Failed to fetch applicants for the selected job.");
      setLoadingApplicants(false);
    }
  };

  const handleSendMessage = async (applicantId, message) => {
    const token = localStorage.getItem("jwtToken");
    try {
      await axios.post(
        `http://localhost:3000/api/recruiter/message/${applicantId}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Message sent successfully!");
    } catch (error) {
      alert("Failed to send message.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader
          className="animate-spin"
          size={48}
        />
      </div>
    );
  if (error)
    return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Created Jobs</h1>

      {showContent && jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition duration-300"
              onClick={() => fetchApplicants(job.id)}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                {job.title}
              </h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Building
                  size={18}
                  className="mr-2"
                />
                <span>{job.companyname}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin
                  size={18}
                  className="mr-2"
                />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <DollarSign
                  size={18}
                  className="mr-2"
                />
                <span>Salary: ₹{job.salary.toLocaleString()}</span>
              </div>
              <p className="text-gray-700">{job.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        showContent && (
          <div className="text-center text-gray-600">No jobs created yet.</div>
        )
      )}

      {loadingApplicants ? (
        <div className="flex justify-center items-center h-64">
          <Loader
            className="animate-spin"
            size={48}
          />
        </div>
      ) : (
        !showContent &&
        selectedJob && (
          <div className="mt-8">
            <button
              onClick={() => setShowContent(true)}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <ChevronLeft
                size={20}
                className="mr-1"
              />
              Back to Jobs
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Applicants for {selectedJob.title}
            </h2>
            {applicants.length > 0 ? (
              <ul className="space-y-6">
                {applicants.map((applicant) => (
                  <li
                    key={applicant.id}
                    className="border p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      {applicant.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Mail
                        size={18}
                        className="mr-2"
                      />
                      <span>{applicant.email}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{applicant.bio}</p>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Briefcase
                        size={18}
                        className="mr-2"
                      />
                      <span>Skills: {applicant.skills.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <a
                        href={applicant.resume}
                        className="text-blue-500 hover:text-blue-700 transition duration-300 flex items-center"
                      >
                        <FileText
                          size={18}
                          className="mr-2"
                        />
                        View Resume ({applicant.resumeOriginalName})
                      </a>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                        onClick={() => {
                          setCurrentApplicant(applicant);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Mail
                          size={18}
                          className="mr-2"
                        />
                        Message
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-600">
                No applicants for this job yet.
              </div>
            )}
          </div>
        )
      )}

      <MessageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSend={handleSendMessage}
        applicant={currentApplicant}
      />
    </div>
  );
};

export default MyCreatedJobs;
