import React from 'react';
import { StyledCart } from './cart_styles';
import { CloseButton } from 'src/components/styles/CloseButton';
import { Supreme } from 'src/components/styles/Supreme';
import { SickButton } from 'src/components/styles/SickButton';
import { useSelector, useDispatch } from 'react-redux';
import { cartOpenSelector, cartClosed } from 'src/model/cart';
import { useMeQuery } from 'src/queries/user';
import { CartItem } from 'src/components/cart_item/CartItem';
import { formatMoney } from 'src/lib/format_money';
import { calcTotalPrice } from 'src/lib/calc_total_price';

export const Cart: React.FC = () => {
  const cartOpen = useSelector(cartOpenSelector);
  const dispatch = useDispatch();
  const { data } = useMeQuery();
  if (!data) {
    return null;
  }
  const { me } = data;
  return (
    <StyledCart open={cartOpen}>
      <header>
        <CloseButton title='close' onClick={() => dispatch(cartClosed())}>
          &times;
        </CloseButton>
        <Supreme>{me.name}'s Cart</Supreme>
        <p>You have {me.cartItems.length} items in your cart.</p>
      </header>
      <ul>
        {me.cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} data={cartItem}></CartItem>
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cartItems))}</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </StyledCart>
  );
};
