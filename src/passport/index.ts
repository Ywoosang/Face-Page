import * as passport from 'passport';
import local from './localStrategy';
import kakao from './kakaoStrategy';
import google from './googleStrategy';
import naver from './naverStrategy';
import github from './githubStrategy'; 
import AuthDao from '../daos/auth.dao';
 


export default ()=>{
    const authDao = new AuthDao();
    passport.serializeUser((user: any,done) => {
        done(null, user.id); // 세션에 user 의 id 만 저장
    });

    passport.deserializeUser(async(id: number,done) => {
        try{
            const user = await authDao.getUserById(id);
            // req.user 로 설정
            console.log('실행',user)
            done(null,user);
        } catch(error){
            done(error);
        }
    })
    local();
    kakao();
    google();
    naver();
    github();
}
 