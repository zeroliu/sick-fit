import React from 'react';
import { Nav } from 'components/nav/Nav';

export const Header: React.FC = () => {
  return (
    <div>
      <div className='bar'>
        <a href=''>Sick Fit</a>
        <Nav></Nav>
      </div>
      <div className='sub-bar'>
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
};
