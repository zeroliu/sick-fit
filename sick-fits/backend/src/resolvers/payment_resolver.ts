import { Resolver, Mutation, Ctx, InputType, Field, Arg } from 'type-graphql';

import { CartItem } from 'src/entity/cart_item';
import { getStripe } from 'src/libs/stripe';
import { getUserById } from 'src/libs/utils';
import { Context } from 'src/types';

@InputType()
class PayInput {
  @Field()
  paymentMethodId!: string;
}

@Resolver()
export class PaymentResolver {
  @Mutation(() => Boolean)
  async pay(
    @Arg('data') data: PayInput,
    @Ctx() ctx: Context,
  ): Promise<boolean> {
    const user = await getUserById(ctx.req.userId);
    const cartItems = await CartItem.find({ where: { user } });
    const amount = cartItems.reduce((tally, cartItem) => {
      return tally + cartItem.quantity * cartItem.item.price;
    }, 0);
    const paymentIntent = await getStripe().paymentIntents.create({
      payment_method: data.paymentMethodId,
      amount,
      currency: 'usd',
      confirm: true,
    });
    if (paymentIntent.status === 'succeeded') {
      return true;
    }
    throw new Error(`Invalid payment status ${paymentIntent.status}`);
  }
}
