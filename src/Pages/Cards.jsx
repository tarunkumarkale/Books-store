
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFirebase } from '../Context/Firebase'
import { useNavigate } from 'react-router-dom';

const Cards = ({name, price, imageURL,id}) => {
  const [url, setUrl] = useState(null);
  const firebase = useFirebase();
const Navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageUrl = await firebase.getImageUrl(imageURL);
        setUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
        // Handle the error here
      }
    };

    fetchData();
  }, [firebase, imageURL]);
console.log(id)
  return (
    <div className='flex flex-row'>
      <div className="m-8 bg-white rounded-lg shadow-md p-4 flex flex-col mt-5 w-[30%] flex-wrap justify-center">
        <img src={url} alt={name} className="w-60 h-auto rounded-lg mr-2" />
        <div>
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700 text-center text-2xl font-semibold">Price:{price}</p>
          <button onClick={e=>Navigate(`/view/${id}`)} className= "ml-[38%] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
      View
    </button>
    {/* button kaa kaam hai onclikc data nevigate to detail product mene bss id ly bss */}
        </div>
      </div>
    </div>
  );
};

export default Cards;