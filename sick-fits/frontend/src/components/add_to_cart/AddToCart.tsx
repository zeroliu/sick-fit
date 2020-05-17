import React from 'react';
import { useAddToCartMutation } from 'src/queries/cart';

interface Props {
  id: string;
}
export const AddToCart: React.FC<Props> = ({ id: itemId }) => {
  const [addToCart, { error }] = useAddToCartMutation({
    variables: {
      data: {
        itemId,
      },
    },
  });
  if (error) {
    alert(error.message);
  }

  return <button onClick={() => addToCart()}>Add To Cart</button>;
};