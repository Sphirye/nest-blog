import { Controller, Delete, Get, Post, Put, Body, Param, Req, Res, Patch, Request, UseInterceptors, UploadedFiles, Bind, UploadedFile } from '@nestjs/common';
import { PostService } from "./posts.service";
import { PostInterface } from "./interfaces/Post";
import { CreatePostDto } from "./dto/create-post.dto";
import { Response } from "express";
import { Connection, getConnection, getRepository } from 'typeorm';
import { PostEntity } from './entity/post.entity';
import { title } from 'process';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

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
    post(
        //Estas tres cosas devuelven lo mismo, el form data que envias desde vue
        @Request() title: string,
        @Request() description: string,
        @Request() content: string
        ){
        console.log(title)
        //return this.postService.create(title, description, content);
    }

    //Aquí reemplace el put por el patch como mencionaste, pero el resultado es el mismo, aún estoy reemplazando el post entero en lugar de solo una propiedad.
    @Patch(":postId")
    async update(@Param("postId") postId, @Body() newPostBody: CreatePostDto) {
        return this.postService.update(postId, newPostBody);
    }
 
    @Delete(":postId")
    delete(@Param("postId") postId) {
        return this.postService.delete(postId);
    }
}
