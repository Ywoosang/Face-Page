import { IsString  } from 'class-validator';
 
class RegisterPostRequestDto {
  @IsString()
  public originalUrl: string;

  @IsString()
  public styleUrl: string;

  @IsString()
  public manipulatedUrl: string;

  @IsString()
  public styleKey: string;
}
 
export default RegisterPostRequestDto;