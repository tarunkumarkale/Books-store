import React, { useState } from 'react'
import { SiGnuprivacyguard } from "react-icons/si";
import { useFirebase } from '../Context/Firebase';



const Register = () => {

const firebase=useFirebase()


const [email,setemail]=useState('')
const [pass,setpass]=useState('')

console.log(firebase)
  const handleSubmit =async(e)=>{
e.preventDefault()
console.log('Sign up a user ...............')
const result=await firebase.signupUserEmailAndPass(email,pass)
console.log("Successs full",result)

  }

  return (

    <>
    <div className=' flex '>   <h1 className='text-center text-red-800 font-extrabold mt-10 uppercase flex ml-10'>Register page    <SiGnuprivacyguard />   </h1>      </div>
    <div className='m-5'>
       <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Email</label>
        <input type="email"  value={email} onChange={(e)=>setemail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">password</label>
        <input type="password" value={pass}  onChange={(e)=>setpass(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </div>
    </form>
    </div>
    </>
  )
}

export default Register
