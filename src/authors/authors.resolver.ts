import {Args,Mutation,Parent,Query,ResolveField, Resolver} from '@nestjs/graphql';
import { Post } from '../posts/entities/post.entity';
import { Author } from './entities/author.entity';
import { AuthorsService } from './authors.service';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author])
  authors() {
    return this.authorsService.findAll();
  }

  @Mutation(() => Author)
  createAuthor(@Args('name') name: string) {
    return this.authorsService.create(name);
  }

  @ResolveField(() => [Post])
  posts(@Parent() author: Author) {
    return this.authorsService.authorPosts(author.id);
  }
}
