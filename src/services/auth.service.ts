import AuthDao from '../daos/auth.dao'
import RegisterUserDto from '../dtos/user.dto'; 
import HttpException from '../exceptions/http.exception';
import  * as bcrypt from 'bcrypt';

class AuthService {
    private authDao = new AuthDao(); 

    public registerUser = async (user : RegisterUserDto) => {
        const exUser = await this.authDao.getUserByEmail(user.email);
        if (exUser) {
            throw new HttpException(400,'이미 사용자가 존재합니다.');
        }
        const hash = await bcrypt.hash(user.password,12)
        await this.authDao.postUser({
             email: user.email,
             name: user.name,
             password: hash,
        });
    }
}

export default AuthService;