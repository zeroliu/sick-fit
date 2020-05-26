import React from 'react';

import { CheckAuth } from 'src/components/check_auth/CheckAuth';
import { Permissions } from 'src/components/permissions/Permissions';

export default function PermissionsPage() {
  return (
    <CheckAuth>
      <Permissions />
    </CheckAuth>
  );
}
