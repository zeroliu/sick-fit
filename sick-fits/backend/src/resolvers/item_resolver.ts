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
import { User, UserPermission } from 'src/entity/user';
import { hasPermission, getUserById } from 'src/utils';
import { Like } from 'typeorm';

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

@ArgsType()
export class ItemsInput extends PaginationInput {
  @Field({ nullable: true })
  searchTerm?: string;
}

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items(
    @Args() { take, skip, searchTerm = '' }: ItemsInput,
  ): Promise<Item[]> {
    return Item.find({
      take,
      skip,
      order: { title: 'ASC' },
      where: [
        {
          title: Like(`%${searchTerm}%`),
        },
        {
          description: Like(`%${searchTerm}%`),
        },
      ],
    });
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
  async deleteItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context,
  ): Promise<number | null> {
    const user = await getUserById(ctx.req.userId);
    const item = await Item.findOne({ id });
    const ownsItem = item?.user?.id === ctx.req.userId;
    if (
      !ctx.req.userId ||
      (!hasPermission(user, [
        UserPermission.ADMIN,
        UserPermission.ITEM_DELETE,
      ]) &&
        !ownsItem)
    ) {
      throw new Error('You do not have sufficient permissions.');
    }
    const result = await Item.delete(id);
    if (!result.affected || result.affected <= 0) {
      return null;
    }
    return id;
  }
}
