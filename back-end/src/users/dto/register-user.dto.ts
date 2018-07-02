import { IsNotEmpty, IsString, IsArray, IsEmpty, IsBoolean } from 'class-validator';

export class RegisterUser {
  @IsNotEmpty()
  @IsString()
  public readonly nickname: string;
  @IsNotEmpty()
  @IsString()
  public readonly username: string;
  @IsNotEmpty()
  @IsString()
  public readonly password: string;
  @IsNotEmpty()
  @IsString()
  public readonly email: string;
  @IsString() public readonly mobile?: string;
  @IsArray() public readonly roles?: string[] = ['user'];
  @IsArray() public readonly groups?: string[] = ['default'];
  @IsString() public readonly avatar?: string = './assets/tmp/img/avatar.jpg';
  @IsBoolean() public enabled?: boolean = false;

  @IsString() public readonly description?: string = '';
}
