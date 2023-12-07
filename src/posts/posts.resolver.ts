import {Args,Mutation,Parent,Query,ResolveField, Resolver} from '@nestjs/graphql';
import { Author } from '../authors/entities/author.entity';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}



  @Query(() => Post)
  async post() {
    // let's fetch the first post available in the database
    const posts = await this.postsService.findAll();
    return posts.length > 0 ? posts[0] : null;
  }

  @Mutation(() => Post)
  createPost(@Args('title') title: string, @Args('authorId') authorId: string) {
    return this.postsService.createPost(title, authorId);
  }

  @ResolveField(() => [Author])
  author(@Parent() post: Post) {
    return this.postsService.postAuthor(post.id);
  }
}
