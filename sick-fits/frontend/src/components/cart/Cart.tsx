import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyledCart } from './cart_styles';
import { CartItem } from 'src/components/cart_item/CartItem';
import { CloseButton } from 'src/components/styles/CloseButton';
import { SickButton } from 'src/components/styles/SickButton';
import { Supreme } from 'src/components/styles/Supreme';
import { calcTotalPrice } from 'src/lib/cart';
import { formatMoney } from 'src/lib/format_money';
import { cartOpenSelector, cartClosed } from 'src/model/cart';
import { checkoutStarted } from 'src/model/checkout';
import { useMeQuery } from 'src/queries/user';

export const Cart: React.FC = () => {
  const cartOpen = useSelector(cartOpenSelector);
  const dispatch = useDispatch();
  const { data } = useMeQuery();
  if (!data?.me) {
    return null;
  }
  const handleCheckout = () => {
    dispatch(checkoutStarted());
  };
  const { me } = data;
  return (
    <StyledCart open={cartOpen}>
      <header>
        <CloseButton title='close' onClick={() => dispatch(cartClosed())}>
          &times;
        </CloseButton>
        <Supreme>{me.name}&apos;s Cart</Supreme>
        <p>You have {me.cartItems.length} items in your cart.</p>
      </header>
      <ul>
        {me.cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} data={cartItem}></CartItem>
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cartItems))}</p>
        <SickButton onClick={handleCheckout}>Checkout</SickButton>
      </footer>
    </StyledCart>
  );
};
