import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';

const MyNavbar = () => {
const Firebase=useFirebase()



  return (
    <header className="bg-red-700 shadow-lg sticky top-0 z-50 ">
      <div className="flex items-center justify-between px-16 py-3">
        {/* <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">My App</h1>
        </div> */}
        <nav>
          <ul className="flex space-x-10 items-center">
            <li><Link to="/" className="font-extrabold text-gray-800 hover:text-blue-500">Home</Link></li>
            <li><Link to="/List" className="font-extrabold text-gray-800 hover:text-blue-500">Upload Comics</Link></li>

            <li><Link to="/Register" className=" font-extrabold text-gray-800 hover:text-blue-500">Create a new Account</Link></li>
<div className='flex flex-end  items-end'>
            <li><Link to="/Login" className=" font-extrabold text-gray-800 hover:text-blue-500">{Firebase.isLoogedIN?`You re now signed `: `signing up  🆕 (go to login poge) `}</Link></li>
            <li><Link to="/View/Orders" className=" pl-10 font-extrabold text-gray-800 hover:text-blue-500">Orders</Link></li>
            </div>
          </ul>
          {/**/}
        </nav>
      </div>
    </header>
  );
};

export default MyNavbar;