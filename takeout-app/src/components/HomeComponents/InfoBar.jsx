import React, { useEffect, useState } from 'react'

const InfoBar = ({loginUsername}) => {

  let [specificMargin, setSpecificMargin] = useState('mt-16');

  useEffect(()=> {
    if(loginUsername !== undefined && loginUsername !== null && loginUsername.length > 0){
      setSpecificMargin('mt-32');
    }
    else{
      setSpecificMargin('mt-17');
    }
  }, 

  [loginUsername]);

  return (
    <div className='flex flex-row justify-center w-full min-w-120 mb-10'>
      <div className={`flex flex-col justify-around items-center text-green-800 w-full min-w-120 screen180:mt-17 screen216:justify-between screen216:h-18 h-34 ${specificMargin}`}>
        <h3 className='px-6'>If you decide to explore and make changes, please navigate using the links above for change persistance, as this demo doesn't have a backend.</h3>
        <h3 className='px-6'>To log into any of the premade business accounts, username is B# and password is p# where # is 1-7 (Ex. B1 and p1).</h3>
      </div>
    </div>
  )
}

export default InfoBar