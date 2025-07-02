import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const MyIssues = () => {
  const { backendUrl } = useContext(AppContext);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
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
    fetchMyIssues();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <Navbar />
      <div className="flex items-center justify-center pt-24 px-6 sm:px-0">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-80 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Issues</h2>
          <div className="grid gap-4">
            {issues.map((issue) => (
              <div key={issue._id} className="border rounded p-4 shadow bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
                {issue.image && (
                  <img src={issue.image} alt="Issue" className="w-full h-48 object-cover mt-2 rounded" />
                )}
                <p className="mt-2 text-gray-700">{issue.description}</p>
                <p className="mt-1 text-sm text-gray-500">Posted at: {new Date(issue.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIssues;