import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id?: number = undefined;

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    content!: string
}