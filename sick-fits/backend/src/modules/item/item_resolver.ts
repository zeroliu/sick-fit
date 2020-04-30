import { Resolver, Query, Mutation, InputType, Field, Arg } from 'type-graphql';
import { Item } from 'src/entity/item';

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

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return Item.find();
  }

  @Mutation(() => Item)
  async createItem(@Arg('data') data: CreateItemInput): Promise<Item> {
    return await Item.create(data).save();
  }
}
