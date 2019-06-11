import { gql } from 'apollo-boost';

export const allItemsQuery = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
