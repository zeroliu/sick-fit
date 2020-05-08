import gql from 'graphql-tag';

export interface User {
  email: string;
  name: string;
}

export const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($data: RegisterInput!) {
    register(data: $data) {
      name
      email
    }
  }
`;
export interface RegisterMutationData {
  register: User;
}
