import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModule } from './posts/posts.module';
import { PostService } from './posts/posts.service';
import { Connection } from 'typeorm';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "nestblogdatabasetest",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostService],
})
export class AppModule {
  constructor(private connection: Connection){}
}
