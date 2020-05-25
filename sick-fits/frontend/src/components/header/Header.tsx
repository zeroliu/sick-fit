import React from 'react';
import Link from 'next/link';

import { StyledHeader, Logo } from './header_styles';
import { Nav } from 'src/components/nav/Nav';
import { Cart } from 'src/components/cart/Cart';
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
        <Nav></Nav>
      </div>
      <div className='sub-bar'>
        <Search></Search>
      </div>
      <Cart></Cart>
    </StyledHeader>
  );
};
