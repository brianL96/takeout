import React, { useEffect, useState } from 'react'

const PastOrders = ({listOfOrders}) => {

  let [numberOfOrders, setNumberOfOrders] = useState(listOfOrders.length);

  useEffect(() => {
    setNumberOfOrders(listOfOrders.length);
  }, [listOfOrders]);

  function getTitle(){
    if(numberOfOrders === 0){
      return 'You have no past orders.';
    }
    else if(numberOfOrders === 1){
      return 'Your previous order:';
    }
    return `Your previous ${numberOfOrders} orders:`

  }

  function formatOrderItems(itemsArray){
    let arr = [];
    itemsArray.map((x) => {
      arr.push(
        <div className='w-full h-auto min-h-12 flex flex-row justify-start items-center border-b border-gray-500'>

          <div className='flex flex-row justify-start items-center w-4/5 h-auto min-h-12'>
            <div className='h-auto min-h-12 w-auto max-w-3/4 break-words text-wrap overflow-visible pt-3 pb-3 pl-3'>
              <h1>{`${x.itemName}`}</h1>
            </div>
          </div>

          <div className='flex flex-row justify-center items-center w-1/5 h-auto min-h-auto'>
            <h1 className=''>{`$${x.itemPrice}`}</h1>
          </div>

        </div>
      )
    });
    return arr;
  }

  function printOrders(){

    let arr = [];
    let length = listOfOrders.length;
    let outerIndex = 0;
    let orderDetails = null;

    while(outerIndex < length){
      orderDetails = listOfOrders[outerIndex];
      arr.push(
        <div className='w-120 h-auto mt-5 mb-5 border border-black'>
          <div className='flex flex-row justify-center items-center h-20 w-full'>
            <h1 className='text-2xl'>{`Order Placed At: ${orderDetails.time}`}</h1>
          </div>
          <div className='w-full h-16 flex flex-row justify-center items-center border-b border-black'>
            <h1 className='text-xl'>{`To: ${orderDetails.business}`}</h1>
          </div>
          <div className='w-full h-auto flex flex-row justify-center bg-gray-100'>
            <div className='h-auto w-9/10 flex flex-col justify-start'>
              {formatOrderItems(orderDetails.contents)}
            </div>
          </div>
          <div className='w-full h-auto flex flex-row justify-center items-center border-t border-black'>
            <div className='w-9/10 h-16 flex flex-row justify-between items-center'>
              <h1 className='pl-2'>Total:</h1>
              <h1 className='pr-2'>{`$${orderDetails.total}`}</h1>
            </div>
          </div>
        </div>
      )
      outerIndex++;
    }
    
    return arr;
  }
    
  return (
    <div className='h-full overflow-y-auto w-full flex flex-row justify-center mt-16'>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-center items-center w-120 h-24'>
          <h1 className='text-2xl'>{getTitle()}</h1>
        </div>
        {printOrders()}
      </div>
    </div>
  )
}

export default PastOrders