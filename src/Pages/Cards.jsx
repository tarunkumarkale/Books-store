
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFirebase } from '../Context/Firebase'

const Cards = ({name, price, imageURL}) => {
  const [url, setUrl] = useState(null);
  const firebase = useFirebase();

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

  return (
    <div className='flex flex-row'>
      <div className="m-8 bg-white rounded-lg shadow-md p-4 flex flex-col mt-5 w-[34%] flex-wrap">
        <img src={url} alt={name} className="w-60 h-auto rounded-lg mr-4" />
        <div>
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;