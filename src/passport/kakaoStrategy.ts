import * as passport from 'passport'
import * as passportKakao  from 'passport-kakao';
import AuthDao from '../daos/auth.dao';
import '../env';

const KakaoStrategy = passportKakao.Strategy
export default () => {
   const authDao = new AuthDao();
   passport.use(new KakaoStrategy({
       clientID : process.env.KAKAO_CLIENT_ID,
       clientSecret: process.env.KAKAO_CLIENT_SECRET,
       callbackURL : '/api/auth/kakao/callback',
   },async (accessToken,refreshToken,profile,done)=>{
       try {
           const exUser = await authDao.getUserBySnsInfo(profile.id,'kakao'); 
           if(exUser){
               done(null,exUser);
           }else {
               const newUser = await authDao.postUser({
                   email : profile._json.kakao_account.email,
                   name : profile.displayName,
                   snsId : profile.id,
                   provider : 'kakao'
               });
               done(null,newUser); 
           }
       }catch(error) {
           done(error);
       }
   }))
}