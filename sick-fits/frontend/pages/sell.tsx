import React from 'react';

import { CreateItem } from 'src/components/create_item/CreateItem';
import { CheckAuth } from 'src/components/check_auth/CheckAuth';

export default function Sell() {
  return (
    <CheckAuth>
      <CreateItem></CreateItem>
    </CheckAuth>
  );
}
