import React from 'react'
import { useState } from 'react';


const LoginFields = ({activateLogin, blocksArray, clientArray}) => {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [accountType, setAccountType] = useState('client');
  let [usernameError, setUsernameError] = useState('');
  let [usernameBorder, setUsernameBorder] = useState('border-gray-500');
  let [passwordError, setPasswordError] = useState('');
  let [passwordBorder, setPasswordBorder] = useState('border-gray-500');

  function removeUsernameError(){
    if(usernameError.length > 0){
      setUsernameError('');
      setUsernameBorder('border-gray-500');
    }
  }

  function addUsernameError(error){
    setUsernameError(error);
    setUsernameBorder('border-red-500');
  }

  function removePasswordError(){
    if(passwordError.length > 0){
      setPasswordError('');
      setPasswordBorder('border-gray-500');
    }
  }

  function addPasswordError(error){
    setPasswordError(error);
    setPasswordBorder('border-red-500');
  }

  let setLogin = (e) => {

    e.preventDefault();

    let requirementError = false;

    if(username.length === 0){
      addUsernameError('Required');
      requirementError = true;
    }
    else{
      removeUsernameError();
    }

    if(password.length === 0){
      addPasswordError('Required');
      requirementError = true;
    }
    else{
      removePasswordError();
    }

    if(requirementError){
      return;
    }
    
    let array = (accountType === 'client') ? clientArray : blocksArray;
    
    if(checkCredentials(array)){
      activateLogin(username, accountType);
      setUsername('');
      removeUsernameError();
      setPassword('');
      removePasswordError();
    }

  }

  function checkCredentials(array){
    if(array === null){
      return;
    }

    let foundUsername = false;

    let i = 0;
    let length = array.length;
    while(i < length){
      if(array[i].username === username){
        foundUsername = true;
        if(array[i].password === password){
          return true;
        }
        //console.log("Incorrect Login Password");
        addPasswordError('Incorrect Password');
        return false;
      }
      i++;
    }

    if(foundUsername === false){
      addUsernameError('Username Not Found');
    }

    return false;
  }

  let handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  }

  return (
    <div className="flex flex-row justify-center min-w-120 screen180:mt-14 mt-32">
        <form onSubmit={setLogin} className="flex flex-col h-auto w-80 mt-10 border border-black">

            <div className='flex flex-row justify-center items-center w-full h-16'>
                <h2 className='text-2xl font-medium text-green-600 '>Enter Credentials</h2>
            </div>

            <div className='flex flex-row justify-center w-full mt-4'>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className={`border ${usernameBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter Username" />
            </div>
            <div className='flex flex-row justify-start items-center w-full h-auto max-h-8'>
                <h3 className='pl-6 text-red-600'>{usernameError}</h3>
            </div>

            <div className='flex flex-row justify-center w-full mt-2'>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className={`mb-2 border ${passwordBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter Password" />
            </div>
            <div className='flex flex-row justify-start items-center w-full h-auto max-h-8'>
                <h3 className='pl-6 text-red-600'>{passwordError}</h3>
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