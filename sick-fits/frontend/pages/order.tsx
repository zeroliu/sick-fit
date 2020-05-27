import { useRouter } from 'next/router';
import React from 'react';

import { CheckAuth } from 'src/components/check_auth/CheckAuth';
import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { Order } from 'src/components/order/Order';
import { useOrderQuery } from 'src/queries/order';

export default function OrderPage() {
  const router = useRouter();
  const { data, loading, error } = useOrderQuery({
    variables: {
      orderId: router.query.id as string,
    },
  });
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data</p>;
  }
  return (
    <CheckAuth>
      <Order data={data.order} />
    </CheckAuth>
  );
}
