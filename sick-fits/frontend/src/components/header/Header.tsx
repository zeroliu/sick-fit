import React from 'react';
import { Nav } from 'src/components/nav/Nav';
import Link from 'next/link';
import { StyledHeader, Logo } from './header_styles';
import { Cart } from 'src/components/cart/Cart';
import { Search } from '../search/Search';

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
