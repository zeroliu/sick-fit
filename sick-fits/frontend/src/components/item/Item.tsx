import Link from 'next/link';
import React from 'react';

import { Item as StyledItem } from './item_styles';
import { AddToCart } from 'src/components/add_to_cart/AddToCart';
import { DeleteItem } from 'src/components/delete_item/DeleteItem';
import { PriceTag } from 'src/components/styles/PriceTag';
import { Title } from 'src/components/styles/Title';
import { formatMoney } from 'src/lib/format_money';
import { Item as ItemType } from 'src/queries/item';


interface Props {
  data: ItemType;
}

export const Item: React.FC<Props> = ({ data }) => {
  return (
    <StyledItem>
      {data.image && <img src={data.image} alt={data.title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: data.id },
          }}>
          <a>{data.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(data.price)}</PriceTag>
      <p>{data.description}</p>
      <div className='buttonList'>
        <Link
          href={{
            pathname: '/update',
            query: { id: data.id },
          }}>
          <a>Edit ✏️</a>
        </Link>
        <AddToCart id={data.id} />
        <DeleteItem id={data.id}>Delete</DeleteItem>
      </div>
    </StyledItem>
  );
};
