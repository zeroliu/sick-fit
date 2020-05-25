import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { perPage } from 'src/config';
import { useItemsConnectionQuery } from 'src/queries/item';
import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { StyledItemsPagination } from './items_pagination_styles';

interface Props {
  currentPage: number;
}

export const ItemsPagination: React.FC<Props> = ({ currentPage }) => {
  const { data, loading, error } = useItemsConnectionQuery();
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
