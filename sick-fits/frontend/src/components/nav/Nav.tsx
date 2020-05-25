import React from 'react';
import Link from 'next/link';
import { useMeQuery } from 'src/queries/user';
import { SignOut } from 'src/components/sign_out/SignOut';
import { useDispatch } from 'react-redux';
import { cartOpened } from 'src/model/cart';
import { CartCount } from 'src/components/cart_count/CartCount';
import { countItems } from 'src/lib/cart';
import { StyledNav } from './nav_styles';

export const Nav: React.FC = () => {
  const { data } = useMeQuery();
  const dispatch = useDispatch();
  return (
    <StyledNav>
      <Link href='/items'>
        <a>Shop</a>
      </Link>
      {data?.me ? (
        <>
          <Link href='/sell'>
            <a>Sell</a>
          </Link>
          <Link href='/orders'>
            <a>Orders</a>
          </Link>
          <Link href='/me'>
            <a>Account</a>
          </Link>
          <SignOut></SignOut>
          <button onClick={() => dispatch(cartOpened())}>
            My Cart
            <CartCount count={countItems(data.me.cartItems)}></CartCount>
          </button>
        </>
      ) : (
        <Link href='/signup'>
          <a>Sign In</a>
        </Link>
      )}
    </StyledNav>
  );
};
