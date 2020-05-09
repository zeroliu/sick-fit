import gql from 'graphql-tag';
import {
  useQuery,
  useMutation,
  MutationHookOptions,
} from '@apollo/react-hooks';
import {
  MutationRegisterArgs,
  MutationSignInArgs,
} from 'src/generated/graphql';

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

const SIGN_IN_MUTATION = gql`
  mutation($data: SignInInput!) {
    signIn(data: $data) {
      name
      email
    }
  }
`;
interface SignInMutationData {
  signIn: User;
}
export function useSignInMutation(
  options?: MutationHookOptions<SignInMutationData, MutationSignInArgs>,
) {
  return useMutation(SIGN_IN_MUTATION, options);
}

const SIGN_OUT_MUTATION = gql`
  mutation {
    signOut
  }
`;
interface SignOutMutationData {
  signOut: boolean;
}
export function useSignOutMutation(
  options?: MutationHookOptions<SignOutMutationData>,
) {
  return useMutation(SIGN_OUT_MUTATION, options);
}

export const ME_QUERY = gql`
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
