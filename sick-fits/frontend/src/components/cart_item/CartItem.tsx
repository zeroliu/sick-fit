import React from 'react';
import { CartItem as CartItemType } from 'src/queries/user';
import { StyledCartItem } from './cart_item_style';
import { formatMoney } from 'src/lib/format_money';

interface Props {
  data: CartItemType;
}
export const CartItem: React.FC<Props> = ({ data }) => {
  return (
    <StyledCartItem>
      <img
        width={100}
        src={data.item.image || 'no_img.jpg'}
        alt={data.item.title}></img>
      <div className='cart-item-details'>
        <h3>{data.item.title}</h3>
        <p>
          {formatMoney(data.item.price * data.quantity)} -{' '}
          <em>
            {data.quantity} &times; {formatMoney(data.item.price)}
          </em>
        </p>
      </div>
    </StyledCartItem>
  );
};