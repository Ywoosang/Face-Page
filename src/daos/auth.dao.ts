import {getRepository} from 'typeorm';
import { User } from '../entity/user.entity';


class AuthDao {
    private userRepository = getRepository(User);

    public getUserByEmail = async (email: string) => {
        const user = await this.userRepository.findOne({ email });
        return user;
    };

    public getUserById = async (id: number) => {
        const user = await this.userRepository.findOne(id);
        return user;
    };

    public getUserBySnsInfo = async(snsId: string,provider:string) => {
        const user  = await this.userRepository.findOne({
            snsId: snsId,
            provider: provider
        });
        return user;
    }

    public postUser = async (user: any) => {
        const newUser =  this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }
}

export default AuthDao;
