import React from 'react'
import PastOrders from '../components/PastOrdersComponents/PastOrders';

const PastOrdersPage = ({getPastOrders}) => {

    let listOfOrders = getPastOrders();

  return (
    <div className='mb-32'>
      <PastOrders listOfOrders={listOfOrders}/>
    </div>
  )
}

export default PastOrdersPage