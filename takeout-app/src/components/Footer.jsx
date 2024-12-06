import React from 'react'
import { FaCopyright } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex flex-col screen216:flex-row items-center text-lg justify-between py-1 screen216:py-0 px-3 bg-indigo-900 text-white w-full min-w-120 h-20 bottom-0 left-0'>
        <div className='flex flex-row justify-start'>
            <h3>Brian Lemes</h3>
            <FaCopyright className='pl-2 pt-2 text-2xl'/>
        </div>
        <h3>Email: brian.a.lemes.1996@gmail.com</h3>
    </div>
  )
}

export default Footer