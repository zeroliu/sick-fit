import { gql } from 'apollo-boost';

export const updateItemMutation = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $price: Int
    $description: String
  ) {
    updateItem(
      where: { id: $id }
      data: { title: $title, price: $price, description: $description }
    ) {
      id
    }
  }
`;

export const singleItemQuery = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
    }
  }
`;
