import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
    const handleReportClick = () => {
      if (userData) {
          navigate('/upload');
      } else {
          toast.error('Please login to report an issue');
          navigate('/login');
      }
      };
  
    const handleMyIssuesClick = () => {
      if (userData) {
          navigate('/issue/my');
      } else {
          toast.error('Please login to view your issues');
          navigate('/login');
      }
    };
  const sendverificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Determine which issues button to show
  const showMyIssues = location.pathname === '/issue/all';
  const showAllIssues = location.pathname === '/issue/my';

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className='w-28 sm:w-32 cursor-pointer'
      />

      {userData ? (
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block right-0 top-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && (
                <li
                  onClick={sendverificationOtp}
                  className='py-1 px-2 hover:bg-gray-200 cursor-pointer'
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className='py-1 px-2 hover:bg-gray-200 pr-10 cursor-pointer'
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
        >
          Login
        </button>
      )}

      <div className="hidden sm:flex gap-6 text-gray-800">
        <button
          onClick={handleReportClick}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
        >
          Report an Issue
        </button>

        {showMyIssues && (
          <button
            onClick={handleMyIssuesClick}
            className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
          >
            My Issues
          </button>
        )}

        {showAllIssues && (
          <button
            onClick={() => navigate('/issue/all')}
            className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
          >
            All Issues
          </button>
        )}

        {!showMyIssues && !showAllIssues && (
          <button
            onClick={() => navigate('/issue/all')}
            className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
          >
            All Issues
          </button>
        )}
      </div>

      <div className="sm:hidden">
        <select
          onChange={(e) => navigate(e.target.value)}
          className='border rounded px-2 py-1'
          value=""
        >
          <option value="">Menu</option>
          <option value="/upload">Report an Issue</option>
          {showMyIssues && <option value="/issue/my">My Issues</option>}
          {showAllIssues && <option value="/issue/all">All Issues</option>}
          {!showMyIssues && !showAllIssues && <option value="/issue/all">All Issues</option>}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
