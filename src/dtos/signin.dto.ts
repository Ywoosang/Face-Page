import { IsString, MinLength, MaxLength } from 'class-validator';

class SignInDto {
    @IsString()
    @MinLength(7, { message: '이메일이 너무 짧습니다.' })
    @MaxLength(30, { message: '이메일이 너무 깁니다.' })
    public email: string;

    @IsString()
    @MinLength(6, { message: '비밀번호가 너무 짧습니다.' })
    @MaxLength(15, { message: '비밀번호가 너무 깁니다.' })
    public password: string;
}

export default SignInDto;
