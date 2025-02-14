import React from 'react'
import LoginFields from '../components/LoginComponents/LoginFields';

const LoginPage = ({activateLogin, blocksArray, clientArray}) => {
  return (
    <LoginFields activateLogin={activateLogin} blocksArray={blocksArray} clientArray={clientArray}/>
  )
}

export default LoginPage