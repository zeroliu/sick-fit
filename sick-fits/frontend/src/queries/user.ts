import gql from 'graphql-tag';
import {
  useQuery,
  useMutation,
  MutationHookOptions,
} from '@apollo/react-hooks';
import {
  MutationRegisterArgs,
  MutationSignInArgs,
  Mutation,
  MutationUpdatePermissionsArgs,
  User,
  CartItem as GeneratedCartItem,
  Item,
} from 'src/generated/graphql';

const REGISTER_MUTATION = gql`
  mutation($data: RegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;
interface RegisterMutationData {
  register: Pick<User, 'id'>;
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
    }
  }
`;
interface SignInMutationData {
  signIn: Pick<User, 'id'>;
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
      cartItems {
        id
        quantity
        item {
          id
          title
          image
          price
        }
      }
    }
  }
`;
export type CartItem = Pick<GeneratedCartItem, 'id' | 'quantity'> & {
  item: Pick<Item, 'id' | 'price' | 'image' | 'title'>;
};
interface MeQueryData {
  me: Pick<User, 'id' | 'name' | 'email'> & {
    cartItems: CartItem[];
  };
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
export type UserWithPermissions = Pick<
  User,
  'id' | 'name' | 'email' | 'permissions'
>;
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
