import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import {
  MutationResetPasswordArgs,
  MutationRequestResetArgs,
} from 'src/generated/graphql';
import { User } from './user';

const REQUEST_RESET_MUTATION = gql`
  mutation($data: RequestResetInput!) {
    requestReset(data: $data)
  }
`;
interface RequestResetMutationData {
  requestReset: boolean;
}
export function useRequestResetMutation(
  options?: MutationHookOptions<
    RequestResetMutationData,
    MutationRequestResetArgs
  >,
) {
  return useMutation(REQUEST_RESET_MUTATION, options);
}

const RESET_PASSWORD_MUTATION = gql`
  mutation($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      name
      email
    }
  }
`;
interface ResetPasswordMutationData {
  resetPassword: User;
}
export function useResetPasswordMutation(
  options?: MutationHookOptions<
    ResetPasswordMutationData,
    MutationResetPasswordArgs
  >,
) {
  return useMutation(RESET_PASSWORD_MUTATION, options);
}
