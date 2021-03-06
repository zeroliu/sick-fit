import Head from 'next/head';
import React from 'react';

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
      <img src={data.largeImage || 'no_img.jpg'} alt={data.title} />
      <div className='details'>
        <h2>Viewing {data.title}</h2>
        <p>{data.description}</p>
      </div>
    </StyledSingleItem>
  );
};
