import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './user';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
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

  @Field()
  @Column()
  price!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: string;

  @Field()
  @UpdateDateColumn()
  updatedAt!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.items)
  user?: User;
}
