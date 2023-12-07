import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  createPost(title: string, authorId: string) {
    const post = this.postsRepository.create({
      title,
      author: {
        id: authorId,
      },
    });

    return this.postsRepository.save(post);
  }

  findAllByAuthor(authorId: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: {
        author: {
          id: authorId,
        },
      },
    });
  }


  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }
  
  async postAuthor(postId: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
      relations: {
        author: true,
      },
    });

    return post.author;
  }
}
