import React, { useState, ChangeEvent } from 'react';

import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { SickButton } from 'src/components/styles/SickButton';
import { Table } from 'src/components/styles/Table';
import { UserPermission } from 'src/generated/graphql';
import {
  useUsersQuery,
  UserWithPermissions,
  useUpdatePermissionsMutation,
} from 'src/queries/user';

const UserPermissions: React.FC<{ user: UserWithPermissions }> = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useUpdatePermissionsMutation({
    variables: {
      data: {
        userId: user.id,
        permissions,
      },
    },
  });
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setPermissions([...permissions, value] as UserPermission[]);
    } else {
      setPermissions(permissions.filter((permission) => permission !== value));
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {Object.values(UserPermission).map((permission) => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}}`}>
            <input
              id={`${user.id}-permission-${permission}}`}
              type='checkbox'
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handleCheckboxChange} />
          </label>
        </td>
      ))}
      <td>
        <SickButton onClick={() => updatePermissions()} disabled={loading}>
          Updat{loading ? 'ing' : 'e'}
        </SickButton>
      </td>
    </tr>
  );
};

export const Permissions: React.FC = () => {
  const { data, error, loading } = useUsersQuery();
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data?.users) {
    return <p>No user is found.</p>;
  }
  return (
    <div>
      <h2>Manage Permission</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {Object.values(UserPermission).map((permission) => (
              <th key={permission}>{permission}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <UserPermissions key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
