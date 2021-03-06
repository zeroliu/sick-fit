import React from 'react';

import { useAddToCartMutation } from 'src/queries/cart';
import { ME_QUERY } from 'src/queries/user';

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
    refetchQueries: [{ query: ME_QUERY }],
  });
  if (error) {
    window.alert(error.message);
  }

  return (
    <button
      data-testid='button'
      onClick={() => addToCart().catch((e) => console.log(e))}>
      Add To Cart
    </button>
  );
};
