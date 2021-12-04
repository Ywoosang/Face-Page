import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from './post.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true})
  provider: string;

  @Column({ nullable: true})
  password: string;

  @OneToMany(()=> Post, post => post.user)
  posts: Post[];
  
}