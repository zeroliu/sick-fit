import { QueryHookOptions, useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  MutationPayArgs,
  OrderItem as GeneratedOrderItem,
  Order as GeneratedOrder,
  User,
  QueryOrderArgs,
} from 'src/generated/graphql';

const PAY_MUTATION = gql`
  mutation($data: PayInput!) {
    pay(data: $data) {
      id
    }
  }
`;
interface PayMutationData {
  pay: Pick<GeneratedOrder, 'id'>;
}
export function usePayMutation(
  options?: QueryHookOptions<PayMutationData, MutationPayArgs>,
) {
  return useMutation(PAY_MUTATION, options);
}

const ORDER_QUERY = gql`
  query($orderId: ID!) {
    order(orderId: $orderId) {
      id
      paymentIntent
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;
type OrderItem = Pick<
  GeneratedOrderItem,
  'id' | 'title' | 'description' | 'price' | 'image' | 'quantity'
>;
export type Order = Pick<
  GeneratedOrder,
  'id' | 'paymentIntent' | 'total' | 'createdAt'
> & {
  user: Pick<User, 'id'>;
  items: OrderItem[];
};
interface OrderQueryData {
  order: Order;
}
export function useOrderQuery(
  options?: QueryHookOptions<OrderQueryData, QueryOrderArgs>,
) {
  return useQuery(ORDER_QUERY, options);
}
