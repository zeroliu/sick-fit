import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { DELETE_ITEM_MUTATION, DeleteItemMutationData } from 'src/queries/item';
import { MutationDeleteItemArgs } from 'src/generated/graphql';

interface Props {
  id: string;
  children: string;
}

export const DeleteItem: React.FC<Props> = ({ children, id }) => {
  const client = useApolloClient();
  const [deleteItem, { error }] = useMutation<
    DeleteItemMutationData,
    MutationDeleteItemArgs
  >(DELETE_ITEM_MUTATION, {
    variables: { id },
    update: () => {
      client.resetStore();
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
