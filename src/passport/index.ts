import * as passport from 'passport';
import local from './localStrategy';
import AuthDao from '../daos/auth.dao';

const authDao = new AuthDao();

export default ()=>{
    passport.serializeUser((user: any,done) => {
        done(null, user.id); // 세션에 user 의 id 만 저장
    });

    passport.deserializeUser(async(id: number,done) => {
        try{
            const user = await authDao.getUserById(id);
            done(null,user);
        } catch(error){
            done(error);
        }
    })

}