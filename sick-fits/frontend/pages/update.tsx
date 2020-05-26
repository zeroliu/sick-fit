import { useRouter } from 'next/router';
import React from 'react';

import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { UpdateItem } from 'src/components/update_item/UpdateItem';
import { useItemQuery } from 'src/queries/item';

export default function Update() {
  const router = useRouter();
  const { loading, error, data } = useItemQuery({
    variables: { id: router.query.id as string },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (!data?.item) {
    return <p>Error: item not found</p>;
  }

  return <UpdateItem data={data.item} />;
}
