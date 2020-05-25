import React from 'react';
import { useRouter } from 'next/router';

import { SingleItem } from 'src/components/single_item/SingleItem';
import { useItemQuery } from 'src/queries/item';
import { ErrorMessage } from 'src/components/error_message/ErrorMessage';

export default function Item() {
  const router = useRouter();
  const { loading, error, data } = useItemQuery({
    variables: { id: router.query.id as string },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  if (!data?.item) {
    return <p>Item not found for id {router.query.id}</p>;
  }
  return <SingleItem data={data.item}></SingleItem>;
}
