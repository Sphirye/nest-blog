import { Controller, Delete, Get, Post, Put, Body, Param, Req, Res, Patch } from '@nestjs/common';
import { PostService } from "./posts.service";
import { PostInterface } from "./interfaces/Post";
import { CreatePostDto } from "./dto/create-post.dto";
import { Request, Response } from "express";
import { Connection, getConnection, getRepository } from 'typeorm';
import { PostEntity } from './entity/post.entity';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostService) {}

    @Get()
    getPosts(): Promise<PostInterface[]> {
        return this.postService.getPosts();
    }

    @Get(":postId")
    getPost(@Param("postId") postId): Promise<PostInterface> {
        return this.postService.getPost(postId);
    }

    @Post()
    post(@Body() postBody: CreatePostDto){
        return this.postService.createPost(postBody);
    }

    //Aquí reemplace el put por el patch como mencionaste, pero el resultado es el mismo, aún estoy reemplazando el post entero en lugar de solo una propiedad.
    @Patch(":postId")
    async patch(@Param("postId") postId, @Body() newPostBody: CreatePostDto) {
        return this.postService.updatePost(postId, newPostBody);
    }
 
    @Delete(":postId")
    delete(@Param("postId") postId) {
        return this.postService.deletePost(postId);
    }
}
