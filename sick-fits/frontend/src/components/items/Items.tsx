import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ItemsList } from './items_styles';
import { ALL_ITEMS_QUERY, AllItemsQueryData } from 'src/queries/item';
import { Item } from 'src/components/item/Item';

export const Items: React.FC = () => {
  const { loading, error, data } = useQuery<AllItemsQueryData>(ALL_ITEMS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  if (!data) return <p>Error: Empty data</p>;
  return (
    <ItemsList>
      {data.items.map((item: any) => (
        <Item key={item.id} data={item}></Item>
      ))}
    </ItemsList>
  );
};
