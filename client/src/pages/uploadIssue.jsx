import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UploadIssue = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('description', formData.description);
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/issue/upload', dataToSend);

      if (data.success) {
        toast.success('Issue reported successfully');
        setFormData({ title: '', image: null, description: '' });
        navigate('/issue/my');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <Navbar />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>Report an Issue</h2>
        <p className='text-center text-sm mb-6'>Facing any bugs or want to raise a concern? Fill the form below and let us know.</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <input
              onChange={handleChange}
              value={formData.title}
              name="title"
              type="text"
              placeholder='Issue Title'
              className='bg-transparent outline-none w-full text-white'
              required
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white'>
            <label className='cursor-pointer w-full'>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
              />
              {formData.image ? formData.image.name : 'Upload Image'}
            </label>
          </div>

          <div className='mb-4 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]'>
            <textarea
              onChange={handleChange}
              value={formData.description}
              name="description"
              placeholder='Describe the issue'
              className='bg-transparent outline-none w-full text-white resize-none'
              required
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer'
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadIssue;
