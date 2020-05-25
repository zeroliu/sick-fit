import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Item } from './item';
import { User } from './user';

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field(() => Item)
  @ManyToOne(() => Item, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  item!: Item;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cartItems, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user!: User;
}
