'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    experience: '',
    fees: '',
    hospitalVisit: false,
    hospitalName: '',
    avatar: '',
    language: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong');
        console.log(data.error);
        
      } else {
        toast.success('Doctor added successfully');
        console.log(data);
      }
    } catch (error) {
      toast.error('Server error');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 py-10 items-center w-full">
      <input name="doctorName" className='border w-6/12 p-2  rounded' placeholder="Doctor Name" onChange={handleChange} required />
      <input name="experience" className='border w-6/12 p-2  rounded' placeholder="Experience" onChange={handleChange} required />
      <input name="fees" className='border w-6/12 p-2  rounded' placeholder="Fees" type="number" onChange={handleChange} required />
      <input name="hospitalName" className='border w-6/12 p-2  rounded' placeholder="Hospital Name" onChange={handleChange} required />
      <input name="avatar" className='border w-6/12 p-2  rounded' placeholder="Image URL (type Any String Here for now)" onChange={handleChange} required />
      <input name="language" className='border w-6/12 p-2  rounded' placeholder="Language" onChange={handleChange} required />
      <label>
        <input type="checkbox" name="hospitalVisit" onChange={handleChange} />
        Hospital Visit
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Doctor</button>
    </form>
  );
};

export default AddDoctorForm;
