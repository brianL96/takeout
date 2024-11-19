import React from 'react'
import {Link} from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { LuClipboardList } from "react-icons/lu";


const Navbar = ({loginUsername, activateLogout, loginType, countClientCart, changeHideCart}) => {

    let submitLogout = (e) => {
        e.preventDefault();
        activateLogout();
    }

    function setWelcome(){
        if(loginUsername.length > 0){
            return(
                <h1 className='text-lg'>{`Welcome ${loginUsername}`}</h1> 
            )
        }
    }

    function addLogout(){
        if(loginUsername.length > 0){
            return(
                <h1 onClick={(e) => submitLogout(e)} className='cursor-pointer transition hover:scale-110 ease-in-out duration-100'>Log Out</h1>
            )
        }
    }

    function addSignupOptions(){
        if(loginUsername.length === 0){
            return(
                <>
                    <Link to='/login' className='transition hover:scale-110 ease-in-out duration-100'>Login</Link>
                    <Link to='/signup' className='transition hover:scale-110 ease-in-out duration-100'>Signup</Link>
                </>
            );
        }
    }

    function getCart(){
        if(loginType === 'client'){
            return(
                <div onClick={changeHideCart} className='flex flex-row justify-start items-center cursor-pointer transition hover:scale-110 ease-in-out duration-100'>
                    <h1>Cart</h1>
                    <FaShoppingCart className='ml-2'/>
                    {getCartNumber(countClientCart())}
                </div>
            )
        }
    }

    function getCartNumber(count){

        let arr = [];
        if(count > 0 && count <= 9){
            arr.push(<div className='flex flex-row justify-center mt-0 pt-0 ml-0.5 h-5 w-8 rounded-full text-sm text-white bg-amber-600'>{`${count}`}</div>);
        }
        else if(count > 9){
            arr.push(<div className='flex flex-row justify-center mt-0 pt-0 ml-0.5 h-5 w-8 rounded-full text-sm text-white bg-amber-600'>9+</div>);
        }

        return arr;
   
    }

    function getPastOrders(){
        if(loginType === 'client'){
            return(
                <Link className='flex flex-row items-center transition hover:scale-110 ease-in-out duration-100' to='/pastorders'> 
                    <h1>Past Orders</h1>
                    <LuClipboardList className='ml-1 mt-0.5'/>
                </Link>
            )
        }

    }

    function getCardEditor(){
        if(loginType === 'business'){
            return(
                <Link to='/businesseditor' className='transition hover:scale-110 ease-in-out duration-100'>Editor</Link>
            )
        }
    }

    function getGraphs(){
        if(loginType === 'business'){
            return(
                <Link to='/businessgraphs' className='transition hover:scale-110 ease-in-out duration-100'>Sales</Link>
            )
        }
    }



    return (
        <div className="flex flex-row justify-around items-center w-full h-14 bg-indigo-300 border-b border-black fixed mt-0 top-0 mb-0 z-20">
            {setWelcome()}
            {addLogout()}
            <Link to='/' className='transition hover:scale-110 ease-in-out duration-100'><h1>Home</h1></Link>
            {addSignupOptions()}
            {getCardEditor()}
            {getGraphs()}
            {getCart()}
            {getPastOrders()}
        </div>
    );
}
 
export default Navbar;