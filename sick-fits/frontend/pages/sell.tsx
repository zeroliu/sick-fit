import React from 'react';

import { CheckAuth } from 'src/components/check_auth/CheckAuth';
import { CreateItem } from 'src/components/create_item/CreateItem';

export default function Sell() {
  return (
    <CheckAuth>
      <CreateItem></CreateItem>
    </CheckAuth>
  );
}
