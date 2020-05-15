import React from 'react';
import Link from 'next/link';
import { StyledNav } from './nav_styles';
import { useMeQuery } from 'src/queries/user';
import { SignOut } from '../sign_out/SignOut';
import { useDispatch } from 'react-redux';
import { cartOpened } from 'src/model/cart';

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
          <button onClick={() => dispatch(cartOpened())}>My Cart</button>
        </>
      ) : (
        <Link href='/signup'>
          <a>Sign In</a>
        </Link>
      )}
    </StyledNav>
  );
};
