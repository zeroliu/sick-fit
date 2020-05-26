import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { CartItem } from './cart_item';

export enum UserPermission {
  ADMIN,
  USER,
  ITEM_CREATE,
  ITEM_UPDATE,
  ITEM_DELETE,
  PERMISSION_UPDATE,
}

registerEnumType(UserPermission, {
  name: 'UserPermission',
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column('text', { unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true, unique: true })
  resetToken?: string;

  @Column('timestamp', { nullable: true })
  resetTokenExpiry?: Date;

  @Field(() => [UserPermission])
  @Column({
    type: 'enum',
    enum: UserPermission,
    array: true,
    default: [UserPermission.USER],
  })
  permissions!: UserPermission[];

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems!: CartItem[];
}
