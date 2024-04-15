import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebase'
import Cards from './Cards'



const Home = () => {


const firebase=useFirebase()
const [show,setshow]=useState([])
useEffect(()=>{
    firebase.ListallBooks().then(books=>setshow(books.docs))
    
},[])
    return (
 <>
              <h1 className='text-white text-3xl font-bold text-center'>DC Comics Books Collections </h1>
   <div className="flex flex-row flex-wrap  justify-between">
    
    {
      show.map((book,index)=> <Cards  key={index}   id={book.id}  {...book.data()} />)
    }
  </div>
 </>

   
  )
}

export default Home
