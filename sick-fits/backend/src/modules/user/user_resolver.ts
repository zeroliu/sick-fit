import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
} from 'type-graphql';
import { User, UserPermission } from 'src/entity/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Context } from 'src/types';

@InputType()
export class RegisterInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => [UserPermission], { nullable: true })
  permissions?: UserPermission[];
}

@Resolver()
export class RegisterResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('email') email: string): Promise<User | undefined> {
    return await User.findOne({ email });
  }

  @Mutation(() => User)
  async register(
    @Arg('data') data: RegisterInput,
    @Ctx() ctx: Context,
  ): Promise<User> {
    if (!process.env.APP_SECRET) {
      throw new Error('App secret not set');
    }
    data.email = data.email.toLowerCase();
    data.password = await bcrypt.hash(data.password, 10);
    const user = await User.create(data).save();
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    return user;
  }
}
