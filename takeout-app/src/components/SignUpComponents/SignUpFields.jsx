import React, { useState } from 'react'

const SignUpFields = ({addBlock, addClient}) => {

    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [accountType, setAccountType] = useState('client');

    let handleSubmit = (e) => {

        e.preventDefault();
        let object = {username, email, password};
        console.log(object);
        let returnValue = null;

        if(password !== confirmPassword){
            console.log("Password doesn't match.");
            return;
        }

        if(accountType === 'client'){
            returnValue = addClient(object);
        }
        else if(accountType === 'business'){
            returnValue = addBlock(object);
        }

        if(returnValue.found){
            if(returnValue.type === 1){
                console.log("Username already in use.");
            }
            else if(returnValue.type === 2){
                console.log("Email is already in use.");
            }
            return;
        }

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    let handleAccountTypeChange = (e) => {
        console.log(e.target.value);
        setAccountType(e.target.value);
    }

    let inputUsername = (e) => {
        e.preventDefault();
        let value = checkUsername(e.target.value);
        if(value){
            setUsername(e.target.value);
        }
    }

    function checkUsername(value){

        let i = 0;
        let length = value.length;

        if(length > 20){
            console.log("20 character limit.");
            return false;
        }

        while(i < length){
            if(value.charAt(i) === ' '){
                console.log("No blank spaces.");
                return false;
            }
            i++;
        }

        return true;
    }

    return (
        <div className="flex flex-row justify-center w-full screen180:mt-14 mt-32">
            <form onSubmit={handleSubmit} className="flex flex-col h-auto w-80 mt-10 border border-black">

                <div className='flex flex-row justify-center items-center w-full h-16'>
                    <h2 className='text-2xl font-medium text-green-600 '>Sign Up To Get Started</h2>
                </div>
                <div className='flex flex-row justify-center w-full mt-4'>
                    <input type="text" required value={username} onChange={(e) => inputUsername(e)} id="username" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" />
                </div>
                <div className='flex flex-row justify-center w-full mt-2'>
                    <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Email" />
                </div>
                <div className='flex flex-row justify-center w-full mt-2'>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" />
                </div>
                <div className='flex flex-row justify-center w-full mt-2'>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" />
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


                <button className="h-12 text-white bg-slate-600">Sign Up</button>
            </form>
        </div>
    );


}

export default SignUpFields;
