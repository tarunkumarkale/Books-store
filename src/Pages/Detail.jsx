import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import { toast } from 'react-toastify';

const Detail = () => {
    const param = useParams();
    console.log(param);
    const [quantity, setQuantity] = useState(1);
    const [first, setFirst] = useState(null); // Initialize with null
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true); // State to track loading status

    const firebase = useFirebase();

    useEffect(() => {
        firebase.getById(param.bookId).then(value => {
            setFirst(value.data());
            setLoading(false); // Set loading to false when data is fetched
        });
    }, [firebase, param.bookId]); // Added dependencies

    // for img case
    useEffect(() => {
        if (first) {
            const imageURL = first.imageURL;
            firebase.getImageUrl(imageURL).then((url) => setUrl(url));
        }
    }, [first, firebase]); // Added dependencies

    const PlaceOrder = () => {
     
        // console.log(`Order placed for ${quantity} copies of ${first.name}`);
        const result=firebase.placeOrder(param.bookId,quantity)
        console.log(result)
        toast("your order confiremd")
    };

    if (loading) { // Check loading state
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-300" />
                <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
            </div>
        );
    }

    // Check if first and first.name are defined before rendering content
    if (!first || !first.name) {
        return <div>No data found.</div>;
    }

    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl overflow-hidden shadow-lg mt-5">
            <img className="w-full" src={url} alt={first.name} />
            <div className="px-6 py-4">
                <h1 className='font-bold text-2xl'> Details of Comics</h1>
                <div className=" text-xl mb-1">{first.name}</div>
                <div className=" text-xl mb-1">ISBN Number:{first.isbn}</div>
                <h1 className='text-xl'>Price: {first.price}</h1>
                <h1 className='font-semibold text-2xl'>Owner detail</h1>
                <h1 className='text-xl'>Email:{first.userEmail}</h1>
                <h1 className='font-semibold text-2xl'>Quantity</h1>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-full appearance-none border bg-slate-600 rounded py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={PlaceOrder}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default Detail;
