import React, { useEffect } from 'react'


const Cart = ({clientCart, completeClientOrder, removeItemFromClientCart, clientOrderTo}) => {

    function loadList(){

        let arr = [];

        if(clientCart === null || clientCart.length < 1){
            return [
                <div className='flex flex-row justify-center w-full mb-10'>
                    <div className='flex flex-row justify-center items-center w-9/10 h-20 bg-gray-200 border border-black'>
                        <h2>Your Cart Is Empty</h2>
                    </div>
                </div>
            ];
        }

        let size = clientCart.length;
        let i = 0;
        let totalPrice = 0.00;

        while(i < size){
            arr.push(
                <div className='bg-white border-b border-black flex flex-row justify-start w-full h-auto min-h-20 text-lg' key={`item${i}`}>
                    <div className='flex flex-row justify-center items-center w-3/5 h-auto min-h-20 text-base'>
                        <div className='h-auto min-h-12 w-auto max-w-3/4 break-words text-wrap overflow-visible pt-3 pb-3'>
                            {`${clientCart[i].itemName}`}
                        </div>
                    </div>      
                    <div className='flex flex-row justify-center items-center w-1/5 h-auto min-h-20 text-base'>
                        {`$${clientCart[i].itemPrice}`}
                    </div>
                    <div className='flex flex-row justify-center items-center w-1/5 h-auto min-h-20 '>
                        <button value={i} type="button" onClick={(e)=>{cancelItem(e)}} className="h-8 w-16 rounded-md text-white bg-red-600 text-sm">Remove</button>
                    </div>
                </div>          
            )
            
            console.log(parseFloat(clientCart[i].itemPrice));
            console.log(parseFloat(clientCart[i].itemPrice).toFixed(2));
            console.log(+0.00 + parseFloat(clientCart[i].itemPrice).toFixed(2));
            totalPrice = Math.round((totalPrice + parseFloat(clientCart[i].itemPrice)) * 100)/100;
            i++;
        }


        return [
            <div className='flex flex-col justify-start w-105 mb-10 border border-black'>
                <div className='flex flex-row justify-center items-center h-16 w-full text-xl font-medium border-b border-black bg-gray-200'>
                    <h1>{clientOrderTo}</h1>
                </div>
                <div className='flex flex-col justify-start max-h-80 h-80 w-full overflow-y-auto bg-gray-100'>
                    <div>{[...arr]}</div>
                </div>
                {[...getSummary(totalPrice)]}
            </div>
        ];
        
    }

    function getSummary(totalPrice){
        
        let arr = [];
        if(clientCart.length > 0){

            arr.push(
                <div className='flex flex-col justify-start w-full h-auto bg-gray-200'>
                    <div className='flex flex-row justify-around items-center w-full h-20'>
                        <h2>Total Price:</h2>
                        {`$${totalPrice}`}
                    </div>
                    <div className='flex flex-row justify-center items-center h-12 border-t border-black'>
                        <button onClick={(e)=>{submitOrder(e)}} className="h-10 w-32 rounded-md text-white bg-green-600">Checkout</button>
                    </div>
                </div>
            );
        }
        else{
            arr.push(
                <div className='flex flex-row justify-center items-center w-full h-20'>
                    <h2>Your Cart Is Empty</h2>
                </div>
            );
        }

        return arr;
    }

    let submitOrder = (e) => {
        e.preventDefault();
        completeClientOrder();
    }

    let cancelItem = (e) => {
        e.preventDefault();
        let index = parseInt(e.target.value);;
        removeItemFromClientCart(index);
    }

  return (
    <div className='flex flex-row justify-center w-full mt-5'>
        {loadList()}
    </div>
  )
}

export default Cart
