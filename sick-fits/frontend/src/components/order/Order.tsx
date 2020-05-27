import Head from 'next/head';
import React from 'react';

import { StyledOrder } from './order_styles';
import { formatDate } from 'src/lib/format_date';
import { formatMoney } from 'src/lib/format_money';
import { Order as OrderType } from 'src/queries/order';

interface Props {
  data: OrderType;
}
export const Order: React.FC<Props> = ({ data }) => {
  return (
    <StyledOrder>
      <Head>
        <title>Sick Fits - Order {data.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{data.id}</span>
      </p>
      <p>
        <span>Payment ID:</span>
        <span>{data.paymentIntent}</span>
      </p>
      <p>
        <span>Date:</span>
        <span>{formatDate(data.createdAt)}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(data.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{data.items.length}</span>
      </p>
      <div className='items'>
        {data.items.map((item) => (
          <div className='order-item' key={item.id}>
            <img src={item.image || 'no_img.jpg'} alt={item.title} />
            <div className='item-details'>
              <h2>{item.title}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </StyledOrder>
  );
};
