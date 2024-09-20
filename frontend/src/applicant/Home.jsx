import React, { useEffect, useState } from 'react';
import ApplyJob from './ApplyJob'; // Import the ApplyJob component

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        setError('No token found, please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/applicant/jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setJobs(data);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('An error occurred: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded p-4 shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700">
              <strong>Company:</strong> {job.companyname}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {job.description}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-700">
              <strong>Salary:</strong> ₹{job.salary}
            </p>
            <p className="text-gray-700">
              <strong>Recruiter:</strong> {job.recruiter.name}
            </p>

            {/* ApplyJob Button */}
            <ApplyJob jobId={job.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
