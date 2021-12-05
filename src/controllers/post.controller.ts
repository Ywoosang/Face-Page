import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import * as dotenv from 'dotenv';
import { isLoggedIn } from '../middlewares/auth.middleware';
import RegisterPostDto from '../dtos/post.dto';
import PostDao from '../daos/post.dao'; 
 
dotenv.config();

class PostController implements Controller {
    public path = '/post';
    public router = express.Router();
    private postDao = new PostDao();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 포스트 등록
        this.router.post(`${this.path}/`,isLoggedIn,this.registerPost);
        // 포스트 조회
        this.router.get(`${this.path}/`,this.getAllPost);
    }

    private registerPost = async(req,res,next) =>{
        try{
            const { originalUrl,styleUrl, manipulatedUrl, styleKey} = req.body;
            const userId = req.user.id;
            const post: RegisterPostDto = {
                userId,
                originalUrl,
                styleUrl,
                manipulatedUrl,
                styleKey
            }
            const newPost = await this.postDao.registerPost(req.user,post);
            console.log(newPost);
            res.sendStatus(200);
        }catch(error){ 
            next(error);
        }
    }

    private getAllPost = async (req,res,next) =>{
        try{
            const posts = await this.postDao.getAllPosts();
            return res.json({
                posts
            })
        }catch(error){
            next(error);
        }

    }
};

export default PostController;