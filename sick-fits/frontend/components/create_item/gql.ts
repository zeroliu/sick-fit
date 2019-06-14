import { gql } from 'apollo-boost';

export const createItemMutation = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      data: {
        title: $title
        price: $price
        description: $description
        image: $image
        largeImage: $largeImage
      }
    ) {
      id
    }
  }
`;
