import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as bcrypt from 'bcrypt';
import AuthDao from '../daos/auth.dao';

const LocalStrategy = passportLocal.Strategy;
const authDao = new AuthDao();
export default () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.password
    }, async (email, password, done) => {
        try {
            const exUser = await authDao.getUserByEmail(email);
            if (exUser) {
                // 비밀번호 확인
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다" });
                }
            } else {
                done(null, false, { message: "사용자가 존재하지 않습니다" });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }))
}



