import {getRepository} from 'typeorm';
import { Post } from '../entity/post.entity'; 
import RegisterPostDto from '../dtos/post.dto';

class PostAao {
    private postRepository = getRepository(Post);

    public getAllPosts  = async() => {
        // load photos with user
        // https://orkhan.gitbook.io/typeorm/docs/many-to-one-one-to-many-relations
        const posts = await this.postRepository.find({ relations: ["user"]});
        return posts;
    };

    public registerPost = async(user:any,post: RegisterPostDto) => {
        const newPost = this.postRepository.create(post);
        newPost.user = user;
        await this.postRepository.save(newPost);
        return newPost;
    }
}

export default PostAao;
