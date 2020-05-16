import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  InputType,
  Field,
  ID,
  Arg,
} from 'type-graphql';
import { CartItem } from 'src/entity/cart_item';
import { Context } from 'src/types';
import { getUserById } from 'src/utils';
import { Item } from 'src/entity/item';

@InputType()
export class AddToCartInput {
  @Field(() => ID)
  itemId!: number;
}

@Resolver()
export class CartResolver {
  @Query(() => [CartItem])
  async cartItems(@Ctx() ctx: Context): Promise<CartItem[]> {
    const user = await getUserById(ctx.req.userId);
    const cartItems = CartItem.find({
      where: {
        user,
      },
      relations: ['item', 'user'],
    });
    console.log(cartItems);
    return cartItems;
  }

  @Mutation(() => Boolean)
  async addToCart(
    @Arg('data') data: AddToCartInput,
    @Ctx() ctx: Context,
  ): Promise<boolean> {
    const user = await getUserById(ctx.req.userId);
    const item = await Item.findOne({ where: { id: data.itemId } });
    if (!item) {
      throw new Error('Item does not exist.');
    }
    const cartItem = await CartItem.findOne({
      where: {
        user,
        item,
      },
    });
    if (!cartItem) {
      await CartItem.create({
        quantity: 1,
        user,
        item,
      }).save();
    } else {
      await CartItem.update(cartItem.id, { quantity: cartItem.quantity + 1 });
    }
    return true;
  }
}
