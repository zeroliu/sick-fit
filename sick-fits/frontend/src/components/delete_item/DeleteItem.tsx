import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useDeleteItemMutation } from 'src/queries/item';

interface Props {
  id: string;
  children: string;
}

export const DeleteItem: React.FC<Props> = ({ children, id }) => {
  const client = useApolloClient();
  const [deleteItem, { error }] = useDeleteItemMutation({
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
