import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../Context/Firebase'

const Detail = () => {

    const param=useParams()
    console.log(param)
const [first,setfirst]=useState()
const [url,seturl]=useState()
// {bookId: 'XRenkNyWQ001CUUyoQwZ'}  yeah se
    const firebase=useFirebase()
    useEffect(()=>{
   firebase.getById(param.bookId).then(value=>setfirst(value.data()))
    },[])
    console.log(first.price)

    
if(first===null) { return <div className="flex items-center justify-center h-screen">
<div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-300" />
<h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
</div>}

useEffect(()=>{
  if(first){
    const imageURL=first.imageURL;
    firebase.getImageUrl(imageURL).then((url)=>seturl(url))
  }
},[])

  return (
    <div className='container'>
    
      <img src={url} alt="" />
      <h1 className='text-white'></h1>
    </div>
  )
}

export default Detail

