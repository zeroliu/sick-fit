import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

import {
  Mutation,
  MutationAddToCartArgs,
  MutationRemoveFromCartArgs,
} from 'src/generated/graphql';

const ADD_TO_CART_MUTATION = gql`
  mutation($data: AddToCartInput!) {
    addToCart(data: $data)
  }
`;
interface AddToCartMutationData {
  addToCart: Mutation['addToCart'];
}
export function useAddToCartMutation(
  options?: MutationHookOptions<AddToCartMutationData, MutationAddToCartArgs>,
) {
  return useMutation(ADD_TO_CART_MUTATION, options);
}

const REMOVE_FROM_CART_MUTATION = gql`
  mutation($data: RemoveFromCartInput!) {
    removeFromCart(data: $data)
  }
`;
interface RemoveFromCartMutationData {
  removeFromCart: Mutation['removeFromCart'];
}
export function useRemoveFromCartMutation(
  options?: MutationHookOptions<
    RemoveFromCartMutationData,
    MutationRemoveFromCartArgs
  >,
) {
  return useMutation(REMOVE_FROM_CART_MUTATION, options);
}
