import { QueryHookOptions, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Mutation, MutationPayArgs } from 'src/generated/graphql';

const PAY_MUTATION = gql`
  mutation($data: PayInput!) {
    pay(data: $data) {
      id
    }
  }
`;
interface PayMutationData {
  pay: Mutation['pay'];
}
export function usePayMutation(
  options?: QueryHookOptions<PayMutationData, MutationPayArgs>,
) {
  return useMutation(PAY_MUTATION, options);
}
