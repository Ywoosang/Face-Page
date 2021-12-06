import { IsInt, IsString } from 'class-validator';
 
class RegisterPostServiceDto {
  @IsInt()
  public userId: string;

  @IsString()
  public originalUrl: string;

  @IsString()
  public styleUrl: string;

  @IsString()
  public manipulatedUrl: string;

  @IsString()
  public styleKey: string;
}
 
export default RegisterPostServiceDto;