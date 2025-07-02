import React,{useContext} from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const {userData} =  useContext(AppContext)
  const navigate = useNavigate();
  const location = useLocation();
  const handleReportClick = () => {
    if (userData) {
        navigate('/upload');
    } else {
        toast.error('Please login to report an issue');
        navigate('/login');
    }
    };
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt=""  className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hello {userData ? userData.name : 'Citizen'}!<img src={assets.hand_wave} alt="" className='w-8 aspect-square'/> </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Raise Local Issues</h2>
      <p className='mb-8 max-w-md'>Found something broken or problematic on your street? Upload a photo and help bring attention to it. Let’s improve our communities together.</p>
      <button onClick={handleReportClick} className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer'>Report an Issue</button>
    </div>
  )
}

export default Header
