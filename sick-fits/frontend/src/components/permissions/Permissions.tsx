import React, { useState, ChangeEvent } from 'react';
import { useUsersQuery, UserWithPermissions } from 'src/queries/user';
import { ErrorMessage } from '../error_message/ErrorMessage';
import { Table } from '../styles/Table';
import { UserPermission } from 'src/generated/graphql';
import { SickButton } from '../styles/SickButton';

const UserPermissions: React.FC<{ user: UserWithPermissions }> = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setPermissions([...permissions, value] as UserPermission[]);
    } else {
      setPermissions(permissions.filter((permission) => permission !== value));
    }
  };
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {Object.values(UserPermission).map((permission) => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}}`}>
            <input
              type='checkbox'
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handleCheckboxChange}></input>
          </label>
        </td>
      ))}
      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
  );
};

export const Permissions: React.FC = () => {
  const { data, error, loading } = useUsersQuery();
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
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
            <th></th>
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
