import { ADD_TO_CART_MUTATION } from 'src/queries/cart';
import { ME_QUERY } from 'src/queries/user';

interface Options {
  addToCartMutationCallback?: () => void;
  meQueryCallback?: () => void;
}
export function createFailureMocks(itemId: string) {
  return [
    {
      request: {
        query: ADD_TO_CART_MUTATION,
        variables: { data: { itemId } },
      },
      error: new Error('it failed'),
    },
  ];
}

export function createSuccessMocks(itemId: string, options: Options = {}) {
  return [
    {
      request: {
        query: ADD_TO_CART_MUTATION,
        variables: { data: { itemId } },
      },
      result: () => {
        options.addToCartMutationCallback &&
          options.addToCartMutationCallback();
        return { data: { addToCart: true } };
      },
    },
    {
      request: {
        query: ME_QUERY,
      },
      result: () => {
        options.meQueryCallback && options.meQueryCallback();
        return {
          data: {
            me: {
              __typename: 'me',
              id: '1',
              name: 'foo',
              email: 'foo@gmail.com',
              cartItems: [],
            },
          },
        };
      },
    },
  ];
}
