import * as passport from 'passport'
import * as passportNaver  from 'passport-naver';
import * as dotenv from 'dotenv'
import AuthDao from '../daos/auth.dao';
dotenv.config();

const NaverStrategy = passportNaver.Strategy
export default () => {
   const authDao = new AuthDao();
   passport.use(new NaverStrategy({
       clientID : process.env.NAVER_CLIENT_ID,
       clientSecret: process.env.NAVER_CLIENT_SECRET,
       callbackURL : '/api/auth/naver/callback',
   },async (accessToken,refreshToken,profile,done)=>{
       try {
           const exUser = await authDao.getUserBySnsInfo(profile.id,'naver'); 
           if(exUser){
               done(null,exUser);
           }else {
               const newUser = await authDao.postUser({
                   email : profile.emails[0].value,
                   name : profile.displayName || profile._json.nickname || `user-${ (new Date()).getTime()}`,
                   snsId : profile.id,
                   provider : 'naver'
               });
               done(null,newUser); 
           }
       }catch(error) {
           done(error);
       }
   }))
}