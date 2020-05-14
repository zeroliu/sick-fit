import React from 'react';
import { useUsersQuery, UserWithPermissions } from 'src/queries/user';
import { ErrorMessage } from '../error_message/ErrorMessage';
import { Table } from '../styles/Table';
import { UserPermission } from 'src/generated/graphql';
import { SickButton } from '../styles/SickButton';

const User: React.FC<{ user: UserWithPermissions }> = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {Object.values(UserPermission).map((permission) => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}}`}>
            <input type='checkbox'></input>
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
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
