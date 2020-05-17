import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  InputType,
  Field,
  Arg,
  ID,
} from 'type-graphql';
import { User, UserPermission } from 'src/entity/user';
import { Context } from 'src/types';
import { hasPermission, getUserById } from 'src/utils';

@InputType()
class UpdatePermissionsInput {
  @Field(() => ID)
  userId!: number;

  @Field(() => [UserPermission])
  permissions!: UserPermission[];
}

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
    const user = await getUserById(ctx.req.userId);
    if (
      !hasPermission(user, [
        UserPermission.ADMIN,
        UserPermission.PERMISSION_UPDATE,
      ])
    ) {
      throw new Error('You do not have sufficient permissions.');
    }
    return await User.find({
      order: {
        name: 'ASC',
      },
      relations: ['items', 'cartItems'],
    });
  }

  @Mutation(() => Boolean)
  async updatePermissions(
    @Arg('data') data: UpdatePermissionsInput,
    @Ctx() ctx: Context,
  ): Promise<boolean> {
    const user = await getUserById(ctx.req.userId);
    if (
      !hasPermission(user, [
        UserPermission.ADMIN,
        UserPermission.PERMISSION_UPDATE,
      ])
    ) {
      throw new Error('You do not have sufficient permissions.');
    }
    await User.update(data.userId, {
      permissions: data.permissions,
    });
    return true;
  }
}
