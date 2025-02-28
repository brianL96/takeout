import React, { useState } from 'react'

const SignUpFields = ({addBlock, addClient}) => {

    let [username, setUsername] = useState('');
    let [usernameError, setUsernameError] = useState('');
    let [usernameBorder, setUsernameBorder] = useState('border-gray-500');

    let [email, setEmail] = useState('');
    let [emailError, setEmailError] = useState('');
    let [emailBorder, setEmailBorder] = useState('border-gray-500');

    let [password, setPassword] = useState('');
    let [passwordError, setPasswordError] = useState('');
    let [passwordBorder, setPasswordBorder] = useState('border-gray-500');

    let [confirmPassword, setConfirmPassword] = useState('');
    let [confirmPasswordError, setConfirmPasswordError] = useState('');
    let [confirmPasswordBorder, setConfirmPasswordBorder] = useState('border-gray-500');

    let [accountType, setAccountType] = useState('client');

    let [successMessage, setSuccessMessage] = useState('');

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

      function removeEmailError(){
        if(emailError.length > 0){
          setEmailError('');
          setEmailBorder('border-gray-500');
        }
      }
    
      function addEmailError(error){
        setEmailError(error);
        setEmailBorder('border-red-500');
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

      function removeConfirmPasswordError(){
        if(confirmPasswordError.length > 0){
          setConfirmPasswordError('');
          setConfirmPasswordBorder('border-gray-500');
        }
      }
    
      function addConfirmPasswordError(error){
        setConfirmPasswordError(error);
        setConfirmPasswordBorder('border-red-500');
      }


    let handleSubmit = (e) => {

        e.preventDefault();

        setSuccessMessage('');

        let requirementError = false;

        if(username.length === 0){
            addUsernameError('Required');
            requirementError = true;
        }
        else{
            removeUsernameError();
        }

        if(email.length === 0){
            addEmailError('Required');
            requirementError = true;
        }
        else{
            removeEmailError();
        }
    
        if(password.length === 0){
            addPasswordError('Required');
            requirementError = true;
        }
        else{
            removePasswordError();
        }

        if(confirmPassword.length === 0){
            addConfirmPasswordError('Required');
            requirementError = true;
        }
        else{
            removeConfirmPasswordError();
        }
    
        if(requirementError){
          return;
        }

        let object = {username, email, password};
        console.log(object);
        let returnValue = null;

        if(password !== confirmPassword){
            console.log("Password doesn't match.");
            addConfirmPasswordError('Password doesn\'t match');
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
                addUsernameError("Username already in use");
            }
            else if(returnValue.type === 2){
                console.log("Email is already in use.");
                addEmailError("Email is already in use.");
            }
            return;
        }

        
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage('Sign Up Successful');
        

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
            removeUsernameError();
        }
    }

    function checkUsername(value){

        let i = 0;
        let length = value.length;

        if(length > 20){
            console.log("20 character limit.");
            addUsernameError('20 character limit');
            return false;
        }

        while(i < length){
            if(value.charAt(i) === ' '){
                console.log("No blank spaces.");
                addUsernameError('No blank spaces');
                return false;
            }
            i++;
        }

        return true;
    }

    return (
        <div className="flex flex-row justify-center min-w-120 w-full screen180:mt-14 mt-32">
            <form onSubmit={handleSubmit} className="flex flex-col h-auto w-80 mt-10 border border-black">

                <div className='flex flex-row justify-center items-center w-full h-16'>
                    <h2 className='text-2xl font-medium text-green-600 '>Sign Up To Get Started</h2>
                </div>

                <div className='flex flex-row justify-center w-full mt-4'>
                    <input type="text" value={username} onChange={(e) => inputUsername(e)} id="username" className={`mb-2 border ${usernameBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter Username" />
                </div>
                <div className='flex flex-row justify-start items-center w-full h-auto max-h-8'>
                    <h3 className='pl-6 text-red-600'>{usernameError}</h3>
                </div>

                <div className='flex flex-row justify-center w-full mt-2'>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className={`mb-2 border ${emailBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter Email" />
                </div>
                <div className='flex flex-row justify-start items-center w-full h-auto max-h-8'>
                    <h3 className='pl-6 text-red-600'>{emailError}</h3>
                </div>

                <div className='flex flex-row justify-center w-full mt-2'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className={`mb-2 border ${passwordBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter Password" />
                </div>
                <div className='flex flex-row justify-start items-center w-full h-auto max-h-8'>
                    <h3 className='pl-6 text-red-600'>{passwordError}</h3>
                </div>

                <div className='flex flex-row justify-center w-full mt-2'>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" className={`mb-2 border ${confirmPasswordBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Confirm Password" />
                </div>
                <div className='flex flex-row justify-start items-center w-full h-auto max-h-8'>
                    <h3 className='pl-6 text-red-600'>{confirmPasswordError}</h3>
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

                <div className='flex flex-row justify-center w-full h-auto max-h-8 mb-2'>
                    <h3 className='text-green-600 font-medium'>{successMessage}</h3>
                </div>

                <button className="h-12 text-white bg-slate-600">Sign Up</button>
            </form>
        </div>
    );


}

export default SignUpFields;
