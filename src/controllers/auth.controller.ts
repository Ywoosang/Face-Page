import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import * as dotenv from 'dotenv';
import AuthService from '../services/auth.service';
import RegisterUserDto from '../dtos/user.dto';
import * as passport from 'passport';
import HttpException from '../exceptions/http.exception';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth.middleware';

dotenv.config();

class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();
    public authService = new AuthService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 인증여부 확인
        this.router.get(`${this.path}`,this.isAuthenticated)
        // 회원가입 
        this.router.post(`${this.path}/signup`,isNotLoggedIn, this.signUp);
        // 로그인
        this.router.post(`${this.path}/signin`,isNotLoggedIn, this.siginIn);
        // 로그아웃
        this.router.get(`${this.path}/signout`,isLoggedIn, this.signOut);
        // 카카오 로그인
        this.router.get(`${this.path}/kakao`,isNotLoggedIn, passport.authenticate('kakao'));
        // 카카오 로그인 콜백
        this.router.get(`${this.path}/kakao/callback`, passport.authenticate('kakao'),this.snsSignIn);
        // 구글 로그인 
        this.router.get(`${this.path}/google`,isNotLoggedIn, passport.authenticate('google',{ scope: ['profile', 'email'] }));
        // 구글 로그인 콜백
        this.router.get(`${this.path}/google/callback`, passport.authenticate('google'),this.snsSignIn);
        // 네이버 로그인
        this.router.get(`${this.path}/naver`,isNotLoggedIn, passport.authenticate('naver'));
        // 네이버 로그인 콜백
        this.router.get(`${this.path}/naver/callback`, passport.authenticate('naver'), this.snsSignIn);
        // 깃허브 로그인
        this.router.get(`${this.path}/github`,isNotLoggedIn, passport.authenticate('github'));
        // 깃허브 로그인 콜백
        this.router.get(`${this.path}/github/callback`, passport.authenticate('github'),this.snsSignIn);
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
                return next(new HttpException(401,info.message)); 
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

    private isAuthenticated = (req,res,next) => {
        try{
            console.log(req.isAuthenticated())
            if(req.isAuthenticated()){
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            next(error);
        }
    }

    private signOut = async(req,res,next) => {
        try{
            req.logout();
            if(req.session){
                req.session.destroy((error)=>{
                   if(error){
                     console.log(error);
                   }
                });
             }
            return res.sendStatus(200);
        }catch(error){
            next(error);
        }
    }

    private snsSignIn = async(req, res,next) => {
        try{
            res.redirect('http://localhost:8080'); 
        }catch(error){
            next(error); 
        }
    }
};

export default AuthController;