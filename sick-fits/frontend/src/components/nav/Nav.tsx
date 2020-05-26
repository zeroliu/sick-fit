import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { StyledNav } from './nav_styles';
import { CartCount } from 'src/components/cart_count/CartCount';
import { SignOut } from 'src/components/sign_out/SignOut';
import { countItems } from 'src/lib/cart';
import { cartOpened } from 'src/model/cart';
import { useMeQuery } from 'src/queries/user';


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
          <SignOut />
          <button onClick={() => dispatch(cartOpened())}>
            My Cart
            <CartCount count={countItems(data.me.cartItems)} />
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
