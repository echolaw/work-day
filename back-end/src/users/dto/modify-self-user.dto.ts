import { IsNotEmpty, IsString, IsArray, IsBoolean } from 'class-validator';

export class ModifySelfUser {
  @IsNotEmpty()
  @IsString()
  public readonly nickname: string;
  @IsNotEmpty()
  @IsString()
  public readonly username: string;

  @IsNotEmpty()
  @IsString()
  public readonly email: string;
  @IsString() public readonly mobile: string;
  @IsString() public readonly avatar: string = './assets/tmp/img/avatar.jpg';
  @IsString() public readonly description: string = '';
}
