import {
  Resolver,
  Mutation,
  Ctx,
  InputType,
  Field,
  Arg,
  Query,
  ID,
} from 'type-graphql';

import { CartItem } from 'src/entity/cart_item';
import { Order } from 'src/entity/order';
import { OrderItem } from 'src/entity/order_item';
import { UserPermission } from 'src/entity/user';
import { getStripe } from 'src/libs/stripe';
import { getUserById, hasPermission } from 'src/libs/utils';
import { Context } from 'src/types';

@InputType()
class PayInput {
  @Field()
  paymentMethodId!: string;
}

@Resolver()
export class PaymentResolver {
  @Query(() => Order, { nullable: true })
  async order(
    @Arg('orderId', () => ID) orderId: number,
    @Ctx() ctx: Context,
  ): Promise<Order | undefined> {
    const user = await getUserById(ctx.req.userId);
    const order = await Order.findOne(orderId);
    if (!order) {
      throw new Error('Order does not exist.');
    }
    const ownsOrder = order.user.id === ctx.req.userId;
    if (!hasPermission(user, [UserPermission.ADMIN]) && !ownsOrder) {
      throw new Error('No sufficient permission to view the order');
    }
    return order;
  }

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
