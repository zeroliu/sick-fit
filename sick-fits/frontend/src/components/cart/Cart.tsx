import React from 'react';
import { StyledCart } from './cart_styles';
import { CloseButton } from 'src/components/styles/CloseButton';
import { Supreme } from 'src/components/styles/Supreme';
import { SickButton } from 'src/components/styles/SickButton';
import { useSelector, useDispatch } from 'react-redux';
import { cartOpenSelector, cartClosed } from 'src/model/cart';

export const Cart: React.FC = () => {
  const cartOpen = useSelector(cartOpenSelector);
  const dispatch = useDispatch();
  return (
    <StyledCart open={cartOpen}>
      <header>
        <CloseButton title='close' onClick={() => dispatch(cartClosed())}>
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have __ items in your cart.</p>
      </header>
      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </StyledCart>
  );
};
