import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebase'
  import Cards from './Cards'
const Orders = () => {

const [allbooks,setallbooks]=useState([])
const firebase=useFirebase()

 useEffect(()=>{
  if(firebase. isLoogedIN)
   firebase.fetchMyBooks(firebase.user.uid)?.then((books)=>setallbooks(books.docs))
 },[firebase])

console.log(allbooks)


if(!firebase.isLoogedIN) return <h1 className='text-white'>please first logged in</h1>
  return (
  <>

<h1 className='text-center text-white'>books orders page</h1>
  
<div className='flex flex-row'>

{
    allbooks.map((books)=> <Cards link={`/View/Orders/${books.id}`}   key={books.id}  id={books.id} {...books.data()} />)
}
</div>

  </>
  

  )
}

export default Orders
