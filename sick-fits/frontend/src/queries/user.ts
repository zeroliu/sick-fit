import gql from 'graphql-tag';
import {
  useQuery,
  useMutation,
  MutationHookOptions,
} from '@apollo/react-hooks';
import {
  MutationRegisterArgs,
  MutationSignInArgs,
  UserPermission,
  Mutation,
  MutationUpdatePermissionsArgs,
} from 'src/generated/graphql';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserWithPermissions extends User {
  permissions: UserPermission[];
}

const REGISTER_MUTATION = gql`
  mutation($data: RegisterInput!) {
    register(data: $data) {
      id
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
      id
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
      id
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

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;
interface UsersQueryData {
  users: UserWithPermissions[];
}
export function useUsersQuery() {
  return useQuery<UsersQueryData>(USERS_QUERY);
}

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation($data: UpdatePermissionsInput!) {
    updatePermissions(data: $data)
  }
`;
interface UpdatePermissionsMutationData {
  updatePermissions: Mutation['updatePermissions'];
}
export function useUpdatePermissionsMutation(
  options: MutationHookOptions<
    UpdatePermissionsMutationData,
    MutationUpdatePermissionsArgs
  >,
) {
  return useMutation(UPDATE_PERMISSIONS_MUTATION, options);
}
