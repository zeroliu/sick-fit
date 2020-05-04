import React from 'react';
import { StyledItemsPagination } from './items_pagination_styles';
import { useQuery } from '@apollo/react-hooks';
import {
  ItemsConnectionQueryData,
  ITEMS_CONNECTION_QUERY,
} from 'src/queries/item';
import { ErrorMessage } from '../error_message/ErrorMessage';
import Head from 'next/head';
import { perPage } from 'src/config';
import Link from 'next/link';

interface Props {
  currentPage: number;
}

export const ItemsPagination: React.FC<Props> = ({ currentPage }) => {
  const { data, loading, error } = useQuery<ItemsConnectionQueryData>(
    ITEMS_CONNECTION_QUERY,
  );
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  if (!data) {
    return <p>Error loading items pagination.</p>;
  }
  const totalCount = data.itemsConnection.totalCount;
  const pages = Math.ceil(totalCount / perPage);

  return (
    <StyledItemsPagination>
      <Head>
        <title>
          Sick Fits - Page {currentPage} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: {
            page: currentPage - 1,
          },
        }}>
        <a aria-disabled={currentPage <= 1}>Prev</a>
      </Link>
      <p>
        Page {currentPage} of {pages}
      </p>
      <Link
        href={{
          pathname: 'items',
          query: {
            page: currentPage + 1,
          },
        }}>
        <a aria-disabled={currentPage >= pages}>Next</a>
      </Link>
    </StyledItemsPagination>
  );
};
