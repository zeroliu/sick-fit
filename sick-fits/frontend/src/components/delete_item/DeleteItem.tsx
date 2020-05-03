import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  DELETE_ITEM_MUTATION,
  DeleteItemMutationData,
  ALL_ITEMS_QUERY,
  AllItemsQueryData,
} from 'src/queries/item';
import { MutationDeleteItemArgs } from 'src/generated/graphql';

interface Props {
  id: string;
  children: string;
}

export const DeleteItem: React.FC<Props> = ({ children, id }) => {
  const [deleteItem, { error }] = useMutation<
    DeleteItemMutationData,
    MutationDeleteItemArgs
  >(DELETE_ITEM_MUTATION, {
    variables: { id },
    update: (cache, payload) => {
      const data = cache.readQuery<AllItemsQueryData>({
        query: ALL_ITEMS_QUERY,
      });
      if (!data || payload.data?.deleteItem === null) {
        return;
      }
      const filteredItems = data.items.filter(
        (item) => item.id !== payload.data?.deleteItem,
      );
      const newData: typeof data = {
        ...data,
        items: filteredItems,
      };
      cache.writeQuery({ query: ALL_ITEMS_QUERY, data: newData });
    },
  });

  const handleClick = async () => {
    if (confirm('Are you sure to delete this item?')) {
      await deleteItem();
    }
  };

  if (error) {
    console.error(error.message);
  }

  return <button onClick={handleClick}>{children}</button>;
};
