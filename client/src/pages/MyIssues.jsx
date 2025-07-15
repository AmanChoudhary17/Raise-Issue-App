import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const MyIssues = () => {
  const { backendUrl } = useContext(AppContext);
  const [issues, setIssues] = useState([]);

  const fetchMyIssues = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + '/api/issue/my');
      if (data.success) {
        setIssues(data.data || []);
      } else if (data.message === 'No issues found') {
        setIssues([]);
        toast.info(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMyIssues();
  }, [backendUrl]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue?')) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/api/issue/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success('Issue deleted');
        setIssues(issues.filter((issue) => issue._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <Navbar />
      <div className="flex items-center justify-center pt-24 px-6 sm:px-0">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-80 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Issues</h2>
          <div className="grid gap-4">
            {issues.map((issue) => (
              <div key={issue._id} className="border rounded p-4 shadow bg-white relative">
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

                {/* View Location */}
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

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                  >
                    🗑️ Delete
                  </button>

                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIssues;
