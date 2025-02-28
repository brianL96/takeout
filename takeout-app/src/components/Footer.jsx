import React from 'react';
import {FaRegCopyright} from "react-icons/fa";


const Footer = () => {
  return (
    <div className='flex flex-col screen216:flex-row items-center text-lg justify-between py-1 screen216:py-0 px-3 bg-indigo-900 text-white w-full min-w-120 h-24 screen216:h-20 bottom-0 left-0'>
      <div className='flex flex-col justify-start items-center screen216:items-start'>
        <h3>Brian Lemes</h3>
        <div className='flex flex-row justify-start'>
          <div className='ml-1 mt-1'>
            <FaRegCopyright/>
          </div>
          <h3 className='mx-1'>2025</h3>
          <h3>Brian's Restaurants Finder</h3>
        </div>
      </div>
        <h3>Email: brian.a.lemes.1996@gmail.com</h3>
    </div>
  )
}

export default Footer