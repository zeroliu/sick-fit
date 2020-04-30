import gql from 'graphql-tag';
import { CreateItemInput } from 'src/generated/graphql';

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

export const CREATE_ITEM = gql`
  mutation CREATE_ITEM($input: CreateItemInput!) {
    createItem(data: $input) {
      id
    }
  }
`;
export interface CreateItemData {
  createItem: { id: string };
}
export interface CreateItemVariable {
  input: CreateItemInput;
}
