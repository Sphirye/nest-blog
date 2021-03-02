import { Injectable } from '@nestjs/common';
import { PostInterface } from "./interfaces/Post";
import { Connection, getConnection, getRepository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entity/post.entity';
import { title } from 'process';

@Injectable()
export class PostService{
    async getPosts() {
        const posts = await getConnection().query('SELECT * FROM posts');
        return posts;
    }

    async getPost(postId: number) {
        const post = await getConnection().query('SELECT * FROM posts WHERE id = ?', [postId])
        return post;
    }

    async create(title: string, description: string, content: string) {
        const post = new PostEntity()
        if (title.length > 0) post.title = title
        post.description = description
        post.content = content
        const newPost = await getRepository(PostEntity).save(post);
        await getConnection().query('INSERT INTO posts SET ?', [newPost]);
        return "Post Created!";
    }

    async update(postId: number, newPostBody: CreatePostDto) {
        const post = await getRepository(PostEntity).findOne(postId);
        if (post) {
            const updatedPostBody = await getRepository(PostEntity).merge(post, newPostBody);
            await getConnection().query('UPDATE posts set ? WHERE id = ?', [updatedPostBody, postId]);
            return "Post Created!";
        } else {
            return "This post does not exist!";
        }
    }

    async delete(postId: number) {
        await getConnection().query('DELETE FROM posts WHERE id = ?', [postId]);
        return "Post Deleted!";
    }
}