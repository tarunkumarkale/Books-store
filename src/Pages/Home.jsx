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
    <div>
      {
        show.map((book,index)=> <Cards key={index} {...book.data()} />)
      }
    </div>
  )
}

export default Home
