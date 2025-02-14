import React, { useState } from 'react'
import { Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/CartComponents/Cart';
import {IoClose} from "react-icons/io5";



const NavbarLayout = ({loginUsername, activateLogout, loginType, countClientCart, getClientCart, completeClientOrder, removeItemFromClientCart}) => {

  let [hideCart, setHideCart] = useState('hidden');
  let [cartSlide, setCartSlide] = useState('');

  let clientCartDetails = getClientCart();
  let clientCart = clientCartDetails.cart;
  let clientOrderTo = clientCartDetails.businessName;

  let changeHideCart = (e) => {
    e.preventDefault();
    if(hideCart === 'hidden'){
      setHideCart('');
      setCartSlide('animate-moveLeft');
    }
    else{
      setTimeout(()=> {
        setHideCart('hidden');
      }, '950');
      setCartSlide('animate-moveRight');
    }
  }

  function getHiddenCart(){

    if(loginType !== 'client'){
      return [];
    }
  

    return [
      <div key={'key-client-navbarLayout'} className={`flex flex-row justify-end ${hideCart}`}>
        <div className={`screen180:mt-16 mt-36 flex flex-col fixed h-4/5 screen180:h-9/10 w-1/2 min-w-100 overflow-y-auto bg-indigo-100 border border-black z-30 ${cartSlide}`}>
          <div className='h-12 w-full flex flex-row justify-end items-center'>
            <IoClose onClick={(e) => {changeHideCart(e)}} className='mr-5 mt-2 text-3xl text-red-600 cursor-pointer'/>
          </div>
          <div className='flex flex-row justify-center w-full'>
            <div className='w-9/10'>
              <Cart clientCart={clientCart} completeClientOrder={completeClientOrder} removeItemFromClientCart={removeItemFromClientCart} clientOrderTo={clientOrderTo}/>
            </div>
          </div>
        </div>
      </div>
    ]
  }

  return (
    <>
        <Navbar loginUsername={loginUsername} activateLogout={activateLogout} loginType={loginType} countClientCart={countClientCart} changeHideCart={changeHideCart}/>
        {getHiddenCart()}
        <div className=' min-h-screen'>
          <Outlet/>
        </div>
        <Footer/>
    </>
  )
}

export default NavbarLayout