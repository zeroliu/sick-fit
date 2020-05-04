import gql from 'graphql-tag';
import { Mutation, Query } from 'src/generated/graphql';

export interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  largeImage?: string;
}

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int, $take: Int) {
    items(skip: $skip, take: $take) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
export interface AllItemsQueryData {
  items: Item[];
}

export const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    item(id: $id) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
export interface ItemQueryData {
  item?: Item;
}

export const ITEMS_CONNECTION_QUERY = gql`
  query ITEMS_CONNECTION_QUERY {
    itemsConnection {
      totalCount
    }
  }
`;
export interface ItemsConnectionQueryData {
  itemsConnection: Query['itemsConnection'];
}

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($data: CreateItemInput!) {
    createItem(data: $data) {
      id
    }
  }
`;
export interface CreateItemMutationData {
  createItem: { id: number };
}

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $data: UpdateItemInput!) {
    updateItem(id: $id, data: $data)
  }
`;
export interface UpdateItemMutationData {
  updateItem: Mutation['updateItem'];
}

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id)
  }
`;
export interface DeleteItemMutationData {
  deleteItem: Mutation['deleteItem'];
}
