import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { Mutation, MutationAddToCartArgs } from 'src/generated/graphql';

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
