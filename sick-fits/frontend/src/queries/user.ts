import gql from 'graphql-tag';
import {
  useQuery,
  useMutation,
  MutationHookOptions,
} from '@apollo/react-hooks';
import { MutationRegisterArgs } from 'src/generated/graphql';

export interface User {
  email: string;
  name: string;
}

const REGISTER_MUTATION = gql`
  mutation($data: RegisterInput!) {
    register(data: $data) {
      name
      email
    }
  }
`;
interface RegisterMutationData {
  register: User;
}
export function useRegisterMutation(
  options?: MutationHookOptions<RegisterMutationData, MutationRegisterArgs>,
) {
  return useMutation(REGISTER_MUTATION, options);
}

const ME_QUERY = gql`
  query {
    me {
      name
      email
    }
  }
`;
interface MeQueryData {
  me: User;
}
export function useMeQuery() {
  return useQuery<MeQueryData>(ME_QUERY);
}
