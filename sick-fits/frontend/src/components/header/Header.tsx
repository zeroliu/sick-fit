import Link from 'next/link';
import React from 'react';

import { StyledHeader, Logo } from './header_styles';
import { Cart } from 'src/components/cart/Cart';
import { Nav } from 'src/components/nav/Nav';
import { Search } from 'src/components/search/Search';


export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <div className='bar'>
        <Logo>
          <Link href='/'>
            <a>Sick Fit</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className='sub-bar'>
        <Search />
      </div>
      <Cart />
    </StyledHeader>
  );
};
