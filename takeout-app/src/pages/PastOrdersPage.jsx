import React from 'react'
import PastOrders from '../components/PastOrdersComponents/PastOrders';

const PastOrdersPage = ({getPastOrders}) => {

    let listOfOrders = getPastOrders();

  return (
    <>
        <PastOrders listOfOrders={listOfOrders}/>
    </>
  )
}

export default PastOrdersPage