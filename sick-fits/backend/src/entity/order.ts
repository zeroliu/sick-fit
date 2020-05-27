import { ObjectType, Field, Int, ID } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';

import { OrderItem } from './order_item';
import { User } from './user';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true })
  items!: OrderItem[];

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user!: User;

  @Field(() => Int)
  @Column()
  total!: number;

  @Field()
  @Column()
  paymentIntent!: string;
}
