import React from 'react';
import Head from 'next/head';

import { StyledSingleItem } from './single_item_styles';
import { Item } from 'src/queries/item';

interface Props {
  data: Item;
}

export const SingleItem: React.FC<Props> = ({ data }) => {
  return (
    <StyledSingleItem>
      <Head>
        <title>Sick Fits | {data.title}</title>
      </Head>
      <img src={data.largeImage} alt={data.title}></img>
      <div className='details'>
        <h2>Viewing {data.title}</h2>
        <p>{data.description}</p>
      </div>
    </StyledSingleItem>
  );
};
