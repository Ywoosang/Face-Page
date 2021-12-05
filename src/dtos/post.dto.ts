import { IsString, IsInt } from 'class-validator';
 
class RegisterPostDto {
  @IsInt()
  public userId: number;

  @IsString()
  public originalUrl: string;

  @IsString()
  public styleUrl: string;

  @IsString()
  public manipulatedUrl: string;

  @IsString()
  public styleKey: string;
}
 
export default RegisterPostDto;