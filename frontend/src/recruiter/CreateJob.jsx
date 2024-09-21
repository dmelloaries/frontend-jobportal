import React, { useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
} from "lucide-react";

const CreateJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("No token found, please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/recruiter/job",
        {
          companyname: companyName,
          title: title,
          description: description,
          location: location,
          salary: Number(salary),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Job created successfully!");
      console.log(response.data);
    } catch (err) {
      setError(
        "Failed to create job: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative mb-4">
      <Icon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        {...props}
        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 transform hover:scale-105 transition duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Job
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <InputField
          icon={Building}
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <InputField
          icon={Briefcase}
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="relative mb-4">
          <FileText
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        <InputField
          icon={MapPin}
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <InputField
          icon={DollarSign}
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Job"
          )}
        </button>
      </form>
      {error && (
        <p className="mt-4 text-red-500 text-center animate-pulse">{error}</p>
      )}
      {success && (
        <p className="mt-4 text-green-500 text-center animate-pulse">
          {success}
        </p>
      )}
    </div>
  );
};

export default CreateJob;
