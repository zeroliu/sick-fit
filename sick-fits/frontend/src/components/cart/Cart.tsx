import React from 'react';
import { StyledCart } from './cart_styles';
import { CloseButton } from 'src/components/styles/CloseButton';
import { Supreme } from 'src/components/styles/Supreme';
import { SickButton } from 'src/components/styles/SickButton';

export const Cart: React.FC = () => {
  return (
    <StyledCart>
      <header>
        <CloseButton title='close'>&times;</CloseButton>
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
