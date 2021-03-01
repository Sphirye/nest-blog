import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostService } from "./posts.service";
import { PostsController } from "./posts.controller";

@Module({
    imports: [],
    controllers: [PostsController],
    providers: [PostService]
})
export class PostsModule {}