import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';

const AllIssues = () => {
  const { backendUrl } = useContext(AppContext);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(backendUrl + '/api/issue/all');
        setIssues(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIssues();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <Navbar />
      <div className="flex items-center justify-center pt-24 px-6 sm:px-0">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-80 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Issues</h2>

          <div className="grid gap-4">
            {issues.map((issue) => (
              <div key={issue._id} className="border rounded p-4 shadow bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>

                {issue.image && (
                  <img
                    src={issue.image}
                    alt="Issue"
                    className="w-full h-48 object-cover mt-2 rounded"
                  />
                )}

                <p className="mt-2 text-gray-700">{issue.description}</p>

                <p className="mt-1 text-sm text-gray-500">
                  Posted at: {new Date(issue.createdAt).toLocaleString()}
                </p>

                {/* ✅ Location Button */}
                {issue.latitude && issue.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${issue.latitude},${issue.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                  >
                    📍 View Location on Map
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
