import React from 'react';
import { BigButton } from './remove_from_cart';
import { useRemoveFromCartMutation } from 'src/queries/cart';
import { MeQueryData, ME_QUERY } from 'src/queries/user';

interface Props {
  id: string;
}

export const RemoveFromCart: React.FC<Props> = ({ id }) => {
  const [removeFromCart, { loading, error }] = useRemoveFromCartMutation({
    variables: {
      data: { cartItemId: id },
    },
    update: (cache, payload) => {
      const cachedResult = cache.readQuery<MeQueryData>({ query: ME_QUERY });
      if (!payload.data?.removeFromCart || !cachedResult) {
        return;
      }
      const updatedResults: MeQueryData = {
        me: {
          ...cachedResult.me,
          cartItems: cachedResult.me.cartItems.filter(
            (cartItem) => cartItem.id !== id,
          ),
        },
      };
      cache.writeQuery({ query: ME_QUERY, data: updatedResults });
    },
    optimisticResponse: {
      removeFromCart: true,
    },
  });
  if (error) {
    alert(error.message);
  }
  return (
    <BigButton
      disabled={loading}
      title='Delete Item'
      onClick={() => removeFromCart()}>
      &times;
    </BigButton>
  );
};
