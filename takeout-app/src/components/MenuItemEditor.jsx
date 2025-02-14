import React, { useEffect, useState } from 'react'

const MenuItemEditor = ({name, price, description, index}) => {

    let [itemName, setItemName] = useState(name);
    let [itemPrice, setItemPrice] = useState(price);
    let [itemDescription, setItemDescription] = useState(description);

  return (

    <div className='bg-blue-500 w-full h-full'>
        <div className='w-full h-24'>

        </div>
        <div className='w-full h-32'>
            <div className='bg-green-500 rounded-md flex flex-row justify-start h-2/5 w-full'>
                <div className='bg-purple-500 rounded-md flex flex-row justify-center items-center h-full w-3/4'>
                    {name}  
                </div>
                <div className=' bg-indigo-500 rounded-md flex flex-row justify-center items-center h-full w-1/4'>
                    {price} 
                </div>
            </div>
            <div className='bg-orange-400 rounded-md flex flex-row justify-start h-3/5 w-full'>
                <div className='bg-red-500 rounded-md flex flex-row justify-center items-center h-full w-3/4'>
                    {description}
                </div>
                <div className="flex flex-row justify-center h-full w-1/4">
                    <div className='flex flex-col justify-around w-20'>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MenuItemEditor