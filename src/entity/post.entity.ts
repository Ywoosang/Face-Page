import { Entity, PrimaryGeneratedColumn, Column,BaseEntity, ManyToOne,CreateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalUrl: string;

    @Column()
    styleUrl: string;

    @Column()
    manipulatedUrl: string;

    @Column()
    styleKey: string;

    @CreateDateColumn()
    createdAt: Date;
    // 사용자 Join 에 이용
    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE'})
    user: User;

     
}