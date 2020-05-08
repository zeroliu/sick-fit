import React from 'react';
import Link from 'next/link';
import { StyledNav } from './nav_styles';
import { useMeQuery } from 'src/hooks/use_me_query';

export const Nav: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <StyledNav>
      {data?.me && <p>{data.me.name}</p>}
      <Link href='/items'>
        <a>Shop</a>
      </Link>
      <Link href='/sell'>
        <a>Sell</a>
      </Link>
      <Link href='/signup'>
        <a>Signup</a>
      </Link>
      <Link href='/orders'>
        <a>Orders</a>
      </Link>
      <Link href='/me'>
        <a>Account</a>
      </Link>
    </StyledNav>
  );
};
