import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

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

  @Field()
  @Column({ nullable: true })
  image?: string;

  @Field()
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
}
