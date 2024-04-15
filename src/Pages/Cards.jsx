
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
  

   <div className="bg-black rounded-lg shadow-2xl p-4 flex flex-col align-middle w-[20%] m-3 hover:-translate-y-1 hover:scale-105">
      <img src={url} alt='image' className="w-[100%] h-auto rounded-lg mx-auto" />
     <h1 className="text-center uppercase text-white font-bold">{name}</h1>
    <h1 className="text-center text-white font-semibold">Price:{price}</h1>
    <button onClick={e => Navigate(`/view/${id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto">
      View
     </button>
   </div>
      
      
    

  
    // {/* button kaa kaam hai onclikc data nevigate to detail product mene bss id ly bss */}
   
  )
};

export default Cards;




