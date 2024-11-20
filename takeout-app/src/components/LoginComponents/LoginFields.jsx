import React from 'react'
import { useState } from 'react';

const LoginFields = ({activateLogin, blocksArray, clientArray}) => {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [accountType, setAccountType] = useState('client');

  let setLogin = (e) => {

    e.preventDefault();
    
    let array = (accountType === 'client') ? clientArray : blocksArray;
    
    if(checkCredentials(array)){
      activateLogin(username, accountType);
    }
    setUsername('');
    setPassword('');
  }

  function checkCredentials(array){
    if(array === null){
      return;
    }

    let i = 0;
    let length = array.length;
    while(i < length){
      if(array[i].username === username){
        if(array[i].password === password){
          return true;
        }
        console.log("Incorrect Login Password");
        return false;
      }
      i++;
    }
    return false;
  }

  let handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  }

  return (
    <div className="flex flex-row justify-center w-full mt-14">
        <form onSubmit={setLogin} className="flex flex-col h-auto w-80 mt-10 border border-black">

            <div className='flex flex-row justify-center items-center w-full h-16'>
                <h2 className='text-2xl font-medium text-green-600 '>Enter Credentials</h2>
            </div>
            <div className='flex flex-row justify-center w-full mt-4'>
                <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" />
            </div>
            <div className='flex flex-row justify-center w-full mt-2'>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" />
            </div>
            
            <div className='flex flex-row justify-start mt-4 mb-4'>
                <div className='flex flex-row justify-center w-1/2 items-center'>
                    <label htmlFor='client-radio' className='text-base mr-0 cursor-pointer'>Client</label>
                    <input id="client-radio" type="radio" value="client" name="accountType" defaultChecked onChange={(e)=>handleAccountTypeChange(e)} className="w-4 h-4 ml-4 mt-1 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-blue-400 checked:bg-blue-500"/>
                </div>
                <div className='flex flex-row justify-center w-1/2 items-center'>
                    <label htmlFor='business-radio' className='text-base mr-0 cursor-pointer'>Business</label>
                    <input id="business-radio" type="radio" value="business" name="accountType" onChange={(e)=>handleAccountTypeChange(e)} className="w-4 h-4 ml-4 mt-1 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-blue-400 checked:bg-blue-500"/>
                </div>
            </div>


            <button className="h-12 text-white bg-slate-600">Log In</button>
        </form>
    </div>
);

}

export default LoginFields