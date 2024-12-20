import React from 'react'
import Cart from '../components/CartComponents/Cart';

const CartPage = ({getClientCart, completeClientOrder, removeItemFromClientCart}) => {

  let clientCartDetails = getClientCart();
  let clientCart = clientCartDetails.cart;
  let clientOrderTo = clientCartDetails.businessName;

  return (
    <>
      <Cart clientCart={clientCart} completeClientOrder={completeClientOrder} removeItemFromClientCart={removeItemFromClientCart} clientOrderTo={clientOrderTo}/>
    </>
  )
}

export default CartPage