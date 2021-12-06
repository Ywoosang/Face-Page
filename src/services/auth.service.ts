import AuthDao from '../daos/auth.dao'
import RegisterUserDto from '../dtos/user.dto';
import HttpException from '../exceptions/http.exception';
import * as bcrypt from 'bcrypt';

class AuthService {
    private authDao = new AuthDao();

    public registerUser = async (user: RegisterUserDto) => {
        var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if (!reg_email.test(user.email)) {
            throw new HttpException(400, '이메일 형식이 올바르지 않습니다.');;
        }

        const exUser = await this.authDao.getUserByEmail(user.email);
        if (exUser) {
            throw new HttpException(400, '이미 사용자가 존재합니다.');
        }
        const hash = await bcrypt.hash(user.password, 12)
        await this.authDao.postUser({
            email: user.email,
            name: user.name,
            password: hash,
        });
    }
}

export default AuthService;