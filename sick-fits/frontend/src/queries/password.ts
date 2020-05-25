import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

import {
  MutationResetPasswordArgs,
  MutationRequestResetArgs,
  User,
} from 'src/generated/graphql';

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
      id
    }
  }
`;
interface ResetPasswordMutationData {
  resetPassword: Pick<User, 'id'>;
}
export function useResetPasswordMutation(
  options?: MutationHookOptions<
    ResetPasswordMutationData,
    MutationResetPasswordArgs
  >,
) {
  return useMutation(RESET_PASSWORD_MUTATION, options);
}
