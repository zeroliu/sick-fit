import { Resolver, Query, Ctx } from 'type-graphql';
import { User, UserPermission } from 'src/entity/user';
import { Context } from 'src/types';
import { hasPermission } from 'src/utils';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    if (!ctx.req.userId) {
      return;
    }
    return await User.findOne({ id: ctx.req.userId });
  }

  @Query(() => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    if (!ctx.req.userId) {
      throw new Error('You must be logged in!');
    }
    const user = await User.findOne({ id: ctx.req.userId });
    if (!user) {
      throw new Error('User was not found.');
    }
    if (
      !hasPermission(user, [
        UserPermission.ADMIN,
        UserPermission.PERMISSION_UPDATE,
      ])
    ) {
      throw new Error('You do not have sufficient permission.');
    }
    return await User.find();
  }
}
