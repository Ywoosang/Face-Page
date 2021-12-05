import * as passport from 'passport'
import * as passportGithub  from 'passport-github';
import * as dotenv from 'dotenv'
import AuthDao from '../daos/auth.dao';
dotenv.config();

const GithubStrategy = passportGithub.Strategy
export default () => {
   const authDao = new AuthDao();
   passport.use(new GithubStrategy({
       clientID : process.env.GITHUB_CLIENT_ID,
       clientSecret: process.env.GITHUB_CLIENT_SECRET,
       callbackURL : '/api/auth/github/callback',
   },async (accessToken,refreshToken,profile,done)=>{
       try {
           const exUser = await authDao.getUserBySnsInfo(profile.id,'github'); 
           if(exUser){
               done(null,exUser);
           }else {
               const newUser = await authDao.postUser({
                   email : profile.emails[0].value,
                   name : profile.displayName,
                   snsId : profile.id,
                   provider : 'github'
               });
               done(null,newUser); 
           }
       }catch(error) {
           done(error);
       }
   }))
}