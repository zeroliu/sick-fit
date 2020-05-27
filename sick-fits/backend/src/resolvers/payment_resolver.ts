import { Resolver, Mutation, Ctx, InputType, Field, Arg } from 'type-graphql';

import { CartItem } from 'src/entity/cart_item';
import { Order } from 'src/entity/order';
import { OrderItem } from 'src/entity/order_item';
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
  @Mutation(() => Order)
  async pay(@Arg('data') data: PayInput, @Ctx() ctx: Context): Promise<Order> {
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
    if (paymentIntent.status !== 'succeeded') {
      throw new Error(`Invalid payment status ${paymentIntent.status}`);
    }

    const order = await Order.create({
      user,
      total: amount,
      paymentIntent: paymentIntent.id,
    }).save();

    await Promise.all(
      cartItems.map((cartItem) =>
        OrderItem.create({
          ...cartItem.item,
          quantity: cartItem.quantity,
          user,
          order,
        }).save(),
      ),
    );

    await CartItem.delete({ user });
    return order;
  }
}
