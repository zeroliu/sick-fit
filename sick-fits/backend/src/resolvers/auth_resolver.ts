import bcrypt from 'bcryptjs';
import { Resolver, Mutation, Arg, InputType, Field, Ctx } from 'type-graphql';

import { User, UserPermission } from 'src/entity/user';
import { signToken, addTokenToCookie, clearCookie } from 'src/libs/jwt';
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

@InputType()
export class SignInInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async register(
    @Arg('data') data: RegisterInput,
    @Ctx() ctx: Context,
  ): Promise<User> {
    data.email = data.email.toLowerCase();
    data.password = await bcrypt.hash(data.password, 10);
    const user = await User.create(data).save();
    const token = signToken(user.id);
    addTokenToCookie(token, ctx.res);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Arg('data') data: SignInInput,
    @Ctx() ctx: Context,
  ): Promise<User | undefined> {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with ${email} does not exist.`);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Incorrect password.');
    }
    const token = signToken(user.id);
    addTokenToCookie(token, ctx.res);
    return user;
  }

  @Mutation(() => Boolean)
  signOut(@Ctx() ctx: Context): boolean {
    clearCookie(ctx.res);
    return true;
  }
}
