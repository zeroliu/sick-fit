import React from 'react';
import { Item as ItemType } from 'queries/item';
import { Item as StyledItem } from './item_styles';
import Title from 'components/styles/Title';
import Link from 'next/link';
import PriceTag from 'components/styles/PriceTag';
import { formatMoney } from 'lib/format_money';

interface Props {
  data: ItemType;
}

export const Item: React.FC<Props> = ({ data }) => {
  return (
    <StyledItem>
      {data.image && <img src={data.image} alt={data.title}></img>}
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
        <button>Add to Cart</button>
        <button>Delete</button>
      </div>
    </StyledItem>
  );
};
