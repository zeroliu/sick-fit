import React from 'react';
import { Nav } from 'src/components/nav/Nav';
import Link from 'next/link';
import { Cart } from 'src/components/cart/Cart';
import { Search } from 'src/components/search/Search';
import { StyledHeader, Logo } from './header_styles';

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
