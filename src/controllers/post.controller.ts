import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import { isLoggedIn } from '../middlewares/auth.middleware';
import { isPostOwner } from '../middlewares/post.middleware'; 
import RegisterPostRequestDto from '../dtos/registerPostRequest.dto';
import UserDto from '../dtos/user.dto';
import PostService from '../services/post.service';
import '../env';
import RegisterPostServiceDto from '../dtos/registerPostService.dto';

class PostController implements Controller {
    public path = '/post';
    public router = express.Router();
    public postService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 포스트 등록
        this.router.post(`${this.path}`,isLoggedIn,this.registerPost);
        // 포스트 조회
        this.router.get(`${this.path}`,this.getAllPost);
        // 포스트 삭제
        this.router.delete(`${this.path}`,isLoggedIn,isPostOwner,this.deletePost);
    }

    private registerPost = async(req,res,next) =>{
        try{
            const postFrom:RegisterPostRequestDto = req.body;
            const user:UserDto = req.user;
            const post: RegisterPostServiceDto = {
                userId: req.user.id,
                originalUrl: postFrom.originalUrl,
                styleUrl: postFrom.styleUrl,
                manipulatedUrl: postFrom.manipulatedUrl,
                styleKey: postFrom.styleKey
            }
            post.userId = req.user.id;
            await this.postService.registerPost(post,user);
            res.sendStatus(200);
        }catch(error){ 
            next(error);
        }
    }

    private getAllPost = async (req,res,next) =>{
        try{
            const posts = await this.postService.getAllPosts();
            return res.json({
                posts
            })
        }catch(error){
            next(error);
        }
    }

    private deletePost = async (req,res,next) =>{
        try{
            const postId = req.body.postId;
            await this.postService.deletePost(postId);
            return res.sendStatus(200);
        } catch(error) {
            next(error); 
        }
    }
};

export default PostController;