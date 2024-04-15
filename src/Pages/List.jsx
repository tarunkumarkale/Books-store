import React, { useState } from 'react';
import { useFirebase } from '../Context/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const List = () => {

  const firebase=useFirebase()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverPic, setCoverPic] = useState('');
  const [isbnNumber, setisbnNumber] = useState('');
  const [price, setprice] = useState('');
const navii=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form...', { name, email, coverPic,isbnNumber });
    firebase.handleCreateNewListing(name,isbnNumber,price,coverPic)
    setName('')
    setEmail('')
    setCoverPic('')
    setisbnNumber('')
    setprice('')
    toast("success full upload")

  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
        <input type="text"  value={price} onChange={(e) => setprice(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="ISBN NUMBER" className="block text-gray-700 font-bold mb-2">ISBN NUMBER</label>
        <input type="text" id="name" value={isbnNumber} onChange={(e) => setisbnNumber(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="coverPic" className="block text-gray-700 font-bold mb-2">Cover Picture</label>
        <input type="file" id="coverPic" onChange={(e) => setCoverPic(e.target.files[0])} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default List;