import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import * as dotenv from 'dotenv';
import AuthService from '../services/auth.service';
import RegisterUserDto from '../dtos/user.dto';
import * as passport from 'passport';
import HttpException from '../exceptions/http.exception';

dotenv.config();

class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();
    public authService = new AuthService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 회원가입 
        this.router.post(`${this.path}/signup`, this.signUp);
        // 로그인
        this.router.post(`${this.path}/signin`, this.siginIn);
        // 로그아웃
        this.router.get(`${this.path}/signout`, this.signOut);

    }
    // https://norux.me/61
    private  signUp = async(req,res,next) => {
        try{
            const user: RegisterUserDto = req.body;
            console.log(this);
            await this.authService.registerUser(user);
            return res.sendStatus(201); 
        }catch(error){
            next(new HttpException(401,'회원가입에 실패했습니다.')); 
        }
    }

    private siginIn = async(req,res,next) => {
        passport.authenticate('local',(error,user,info) => {
            if(error) {
                next(error)
            }
            if(!user) {
                next(new HttpException(401,info.message)); 
            }
            // req.login 실행시 serialize, deserialize
            return req.login(user,(loginError:Error)=>{
                if(loginError){
                    next(loginError);
                }
                return res.sendStatus(200); 
            })
        })(req,res,next)
    }

    private signOut = async(req,res,next) => {
        req.logout();
        req.session.destory();
        res.sendStatus(200);
    }
};

export default AuthController;