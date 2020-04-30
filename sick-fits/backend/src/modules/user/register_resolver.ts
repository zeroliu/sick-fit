import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql';
import { User } from 'src/entity/user';

@InputType()
export class RegisterInput {
  @Field()
  name!: string;

  @Field()
  email!: string;
}

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<User> {
    return await User.create(data).save();
  }
}
