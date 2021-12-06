import {getRepository} from 'typeorm';
import { Post } from '../entity/post.entity'; 
import RegisterPostServiceDto from '../dtos/registerPostService.dto';
import UserDto from '../dtos/user.dto';


class PostAao {
    private postRepository = getRepository(Post);

    public getAllPosts  = async() => {
        // load photos with user
        // https://orkhan.gitbook.io/typeorm/docs/many-to-one-one-to-many-relations
        const posts = await this.postRepository.find({ relations: ["user"]});
        return posts;
    };

    public registerPost = async(post: RegisterPostServiceDto,user:UserDto ) => {
        const newPost:any = this.postRepository.create(post);
        newPost.user = user;
        await this.postRepository.save(newPost);
        return newPost;
    }

    public deletePostByPostId = async(id: number) => {
        await this.postRepository.delete({ id })
    }
}

export default PostAao;
