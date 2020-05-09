import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

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

  @Column({ nullable: true })
  resetToken?: string;

  @Column({ nullable: true })
  resetTokenExpiry?: string;

  @Field(() => [UserPermission])
  @Column({
    type: 'enum',
    enum: UserPermission,
    array: true,
    default: [UserPermission.USER],
  })
  permissions!: UserPermission[];
}
