import gql from 'graphql-tag';

export interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  largeImage?: string;
}

export const ALL_ITEMS = gql`
  query ALL_ITEMS {
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

export interface AllItemsData {
  items: Item[];
}
