import firebase from 'firebase/compat/app'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../Context/Firebase'

const ViewOrderDetails = () => {
    const firebase = useFirebase()
    const Param = useParams()

    const [Orders, setOrders] = useState([])

    useEffect(() => {
        firebase.getOrders(Param.bookId)?.then((orders)=>setOrders(orders.docs))
    }, [])

    
    return (
        <div>
            <h1 className='text-white'>View Orders</h1>
            <div className='mx-11   w-[40%]'>
            {Orders.map((curele) => {
    const data = curele.data();
    return (
        <div key={curele.id} className='bg-white'>
            <h5 className='text-black'>Name: <span style={{ color: 'red', backgroundColor: 'white' }}>Confidential for Buy premium version</span></h5>
            <h5 className='text-black'>Qty: {data.qty}</h5>
            <h5 className='text-black'>User Email: {data.userEmail}</h5>
        </div>
    );
})}

            </div>
        </div>
    )
}

export default ViewOrderDetails
