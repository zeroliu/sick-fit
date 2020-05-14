import { User, UserPermission } from './entity/user';

export function hasPermission(user: User, permissionsNeeded: UserPermission[]) {
  const matchedPermissions = user.permissions.filter((permissionTheyHave) =>
    permissionsNeeded.includes(permissionTheyHave),
  );
  if (!matchedPermissions.length) {
    return false;
  }
  return true;
}
