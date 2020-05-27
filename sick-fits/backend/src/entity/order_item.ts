import { ObjectType, Field, Int, ID } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Order } from './order';
import { User } from './user';

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  largeImage?: string;

  @Field(() => Int)
  @Column()
  price!: number;

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order!: Order;
}
