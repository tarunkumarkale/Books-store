import React from 'react'

const Cards = ({name,price}) => {
  return (
    <div>
        <div className="bg-white rounded-lg shadow-md p-4 inline-flex items-center">
      <img src=''  alt={name} className="w-20 h-20 rounded-lg mr-4" />
      <div>
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700">{price}</p>
      </div>
    </div>
    </div>
  )
}

export default Cards
