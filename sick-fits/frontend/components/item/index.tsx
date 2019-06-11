import React, { Component } from 'react';
import { ALL_ITEMS_QUERY_items } from 'components/items/types/ALL_ITEMS_QUERY';
import { ItemStyled, Title, PriceTag } from './styles';
import Link from 'next/link';
import { formatMoney } from 'lib/format_money';

interface Props {
  item: ALL_ITEMS_QUERY_items;
}

export class Item extends Component<Props> {
  render() {
    const { item } = this.props;
    return (
      <ItemStyled>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{ pathname: '/item', query: { id: item.id } }}>
            <a>{item.title}</a>
          </Link>
          <PriceTag>{formatMoney(item.price)}</PriceTag>
          <p>{item.description}</p>

          <div className='buttonList'>
            <Link
              href={{
                pathname: 'update',
                query: { id: item.id },
              }}
            >
              <a>Edit</a>
            </Link>
            <button>Add To Cart</button>
            <button>Delete</button>
          </div>
        </Title>
      </ItemStyled>
    );
  }
}
