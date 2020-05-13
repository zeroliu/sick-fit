import {
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  Arg,
  ID,
  ArgsType,
  Args,
  ObjectType,
  Int,
  Ctx,
} from 'type-graphql';
import { Item } from 'src/entity/item';
import { Context } from 'src/types';
import { User } from 'src/entity/user';

@InputType()
export class CreateItemInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  image!: string;

  @Field()
  largeImage!: string;
}

@InputType()
export class UpdateItemInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;
}

@ObjectType()
class Connection {
  @Field(() => Int)
  totalCount!: number;
}

@ArgsType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items(@Args() { take, skip }: PaginationInput): Promise<Item[]> {
    return Item.find({ take, skip });
  }

  @Query(() => Item, { nullable: true })
  async item(@Arg('id', () => ID) id: number): Promise<Item | undefined> {
    return await Item.findOne(id);
  }

  @Query(() => Connection)
  async itemsConnection(): Promise<Connection> {
    const items = await Item.find();
    return { totalCount: items.length };
  }

  @Mutation(() => Item)
  async createItem(
    @Arg('data') data: CreateItemInput,
    @Ctx() ctx: Context,
  ): Promise<Item> {
    if (!ctx.req.userId) {
      throw new Error('You must be logged in to do that.');
    }
    const user = await User.findOne({ id: ctx.req.userId });
    return await Item.create({
      ...data,
      user,
    }).save();
  }

  @Mutation(() => ID, { nullable: true })
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('data') data: UpdateItemInput,
  ): Promise<number | null> {
    const result = await Item.update(id, data);
    if (!result.affected || result.affected <= 0) {
      return null;
    }
    return id;
  }

  @Mutation(() => ID, { nullable: true })
  async deleteItem(@Arg('id', () => ID) id: number): Promise<number | null> {
    const result = await Item.delete(id);
    if (!result.affected || result.affected <= 0) {
      return null;
    }
    return id;
  }
}
