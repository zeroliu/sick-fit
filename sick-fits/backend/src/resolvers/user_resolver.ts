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
import { hasPermission } from 'src/utils';

@InputType()
class UpdatePermissionsInput {
  @Field(() => ID)
  userId!: number;

  @Field(() => [UserPermission])
  permissions!: UserPermission[];
}

async function canUpdatePermission(userId?: number): Promise<boolean> {
  if (!userId) {
    return false;
  }
  const user = await User.findOne({ id: userId });
  if (!user) {
    return false;
  }
  if (
    !hasPermission(user, [
      UserPermission.ADMIN,
      UserPermission.PERMISSION_UPDATE,
    ])
  ) {
    return false;
  }
  return true;
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
    if (!(await canUpdatePermission(ctx.req.userId))) {
      throw new Error('You do not have sufficient permissions.');
    }
    return await User.find({
      order: {
        name: 'ASC',
      },
    });
  }

  @Mutation(() => Boolean)
  async updatePermissions(
    @Arg('data') data: UpdatePermissionsInput,
    @Ctx() ctx: Context,
  ): Promise<boolean> {
    if (!(await canUpdatePermission(ctx.req.userId))) {
      throw new Error('You do not have sufficient permissions.');
    }
    await User.update(data.userId, {
      permissions: data.permissions,
    });
    return true;
  }
}
