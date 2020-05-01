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
} from 'type-graphql';
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

@InputType()
export class UpdateItemInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;
}

@Resolver()
export class ItemResolver {
  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return Item.find();
  }

  @Query(() => Item)
  async item(@Arg('id', () => ID) id: number): Promise<Item | undefined> {
    return await Item.findOne(id);
  }

  @Mutation(() => Item)
  async createItem(@Arg('data') data: CreateItemInput): Promise<Item> {
    return await Item.create(data).save();
  }

  @Mutation(() => Boolean)
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('data') data: UpdateItemInput,
  ): Promise<any> {
    await Item.update(id, data);
    return true;
  }
}
