import React from 'react';
import { Center, ItemsList } from './items_styles';
import { useAllItemsQuery } from 'src/queries/item';
import { Item } from 'src/components/item/Item';
import { ItemsPagination } from '../items_pagination/ItemsPagination';
import { perPage } from 'src/config';

interface Props {
  currentPage: number;
}

export const Items: React.FC<Props> = ({ currentPage }) => {
  const { loading, error, data } = useAllItemsQuery({
    variables: {
      take: perPage,
      skip: (currentPage - 1) * perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  if (!data) return <p>Error: Empty data</p>;
  return (
    <Center>
      <ItemsPagination currentPage={currentPage}></ItemsPagination>
      <ItemsList>
        {data.items.map((item) => (
          <Item key={item.id} data={item}></Item>
        ))}
      </ItemsList>
      <ItemsPagination currentPage={currentPage}></ItemsPagination>
    </Center>
  );
};
