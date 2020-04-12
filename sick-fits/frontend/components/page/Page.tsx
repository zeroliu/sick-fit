import React from 'react';
import { Header } from 'components/header/Header';
import { Meta } from 'components/Meta';

export const Page: React.FC = ({ children }) => (
  <div>
    <Meta></Meta>
    <Header></Header>
    {children}
  </div>
);
