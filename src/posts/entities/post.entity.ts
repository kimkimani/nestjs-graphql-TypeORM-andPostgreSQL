import { Field, ID, ObjectType } from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @ManyToOne(() => Author)
  @JoinColumn()
  @Field(() => Author)
  author: Author;
}