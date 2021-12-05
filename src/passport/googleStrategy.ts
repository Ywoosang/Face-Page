import * as passport from 'passport'
import * as passportGoogle  from 'passport-google-oauth2';
import * as dotenv from 'dotenv'
import AuthDao from '../daos/auth.dao';
dotenv.config();

const GoogleStrategy = passportGoogle.Strategy
export default () => {
   const authDao = new AuthDao();
   passport.use(new GoogleStrategy({
       clientID : process.env.GOOGLE_CLIENT_ID,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
       callbackURL : '/api/auth/google/callback',
   },async (accessToken,refreshToken,profile,done)=>{
       try {
           const exUser = await authDao.getUserBySnsInfo(profile.id,'google'); 
           if(exUser){
               done(null,exUser);
           }else {
            console.log(profile);
               const newUser = await authDao.postUser({
                   email : profile.email,
                   name : profile.displayName,
                   snsId : profile.id,
                   provider : 'google'
               });
               done(null,newUser); 
           }
       }catch(error) {
           done(error);
       }
   }))
}