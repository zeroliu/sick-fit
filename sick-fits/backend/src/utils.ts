import { User, UserPermission } from './entity/user';

export async function getUserById(userId?: number) {
  if (!userId) {
    throw new Error('You must be logged in.');
  }
  const user = await User.findOne({ id: userId });
  if (!user) {
    throw new Error('You must be logged in.');
  }
  return user;
}

export function hasPermission(user: User, permissionsNeeded: UserPermission[]) {
  const matchedPermissions = user.permissions.filter((permissionTheyHave) =>
    permissionsNeeded.includes(permissionTheyHave),
  );
  if (!matchedPermissions.length) {
    return false;
  }
  return true;
}
