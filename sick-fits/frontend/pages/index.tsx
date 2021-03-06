import { useRouter } from 'next/router';
import React from 'react';

import { Items } from 'src/components/items/Items';

export default function Home() {
  const router = useRouter();
  return <Items currentPage={Number(router.query.page) || 1} />;
}
