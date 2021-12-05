import { IsString } from 'class-validator';
 
class RegisterUserDto {
  @IsString()
  public email: string;
 
  @IsString()
  public name: string;

  @IsString()
  public password: string;
}
 
export default RegisterUserDto;