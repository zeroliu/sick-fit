import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
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
  @OneToOne(() => Item, { eager: true })
  @JoinColumn()
  item!: Item;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cartItems, { eager: true })
  user!: User;
}
