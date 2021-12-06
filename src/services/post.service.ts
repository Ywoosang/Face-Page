import RegisterPostServiceDto from '../dtos/registerPostService.dto';
import UserDto from '../dtos/user.dto';
import PostDao from '../daos/post.dao';  

class PostService {
    private postDao = new PostDao();

    public registerPost = async(post:RegisterPostServiceDto, user:UserDto ) =>{
        await this.postDao.registerPost(post,user);
    }

    public getAllPosts = async() => {
        const allPosts = await this.postDao.getAllPosts();
        return allPosts;
    }

    public deletePost = async(id:number) => {
        await this.postDao.deletePostByPostId(id);
    }
}

export default PostService;