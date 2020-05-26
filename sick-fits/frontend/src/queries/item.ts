import {
  useQuery,
  QueryHookOptions,
  MutationHookOptions,
  useMutation,
} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  Mutation,
  Query,
  QueryItemsArgs,
  QueryItemArgs,
  MutationCreateItemArgs,
  MutationUpdateItemArgs,
  MutationDeleteItemArgs,
} from 'src/generated/graphql';

export interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  largeImage?: string;
}

const ALL_ITEMS_QUERY = gql`
  query($skip: Int, $take: Int) {
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
interface AllItemsQueryData {
  items: Item[];
}
export function useAllItemsQuery(
  options?: QueryHookOptions<AllItemsQueryData, QueryItemsArgs>,
) {
  return useQuery(ALL_ITEMS_QUERY, options);
}

const ITEM_QUERY = gql`
  query($id: ID!) {
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
interface ItemQueryData {
  item?: Item;
}
export function useItemQuery(
  options?: QueryHookOptions<ItemQueryData, QueryItemArgs>,
) {
  return useQuery(ITEM_QUERY, options);
}

const ITEMS_CONNECTION_QUERY = gql`
  query {
    itemsConnection {
      totalCount
    }
  }
`;
interface ItemsConnectionQueryData {
  itemsConnection: Query['itemsConnection'];
}
export function useItemsConnectionQuery() {
  return useQuery<ItemsConnectionQueryData>(ITEMS_CONNECTION_QUERY);
}

const CREATE_ITEM_MUTATION = gql`
  mutation($data: CreateItemInput!) {
    createItem(data: $data) {
      id
    }
  }
`;
interface CreateItemMutationData {
  createItem: { id: number };
}
export function useCreateItemMutation(
  options?: MutationHookOptions<CreateItemMutationData, MutationCreateItemArgs>,
) {
  return useMutation(CREATE_ITEM_MUTATION, options);
}

const UPDATE_ITEM_MUTATION = gql`
  mutation($id: ID!, $data: UpdateItemInput!) {
    updateItem(id: $id, data: $data)
  }
`;
interface UpdateItemMutationData {
  updateItem: Mutation['updateItem'];
}
export function useUpdateItemMutation(
  options?: MutationHookOptions<UpdateItemMutationData, MutationUpdateItemArgs>,
) {
  return useMutation(UPDATE_ITEM_MUTATION, options);
}

const DELETE_ITEM_MUTATION = gql`
  mutation($id: ID!) {
    deleteItem(id: $id)
  }
`;
interface DeleteItemMutationData {
  deleteItem: Mutation['deleteItem'];
}
export function useDeleteItemMutation(
  options?: MutationHookOptions<DeleteItemMutationData, MutationDeleteItemArgs>,
) {
  return useMutation(DELETE_ITEM_MUTATION, options);
}
