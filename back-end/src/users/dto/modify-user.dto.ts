import { IsNotEmpty, IsString, IsBoolean, IsEmail, IsMobilePhone } from 'class-validator';

export class ModifyUser {
  @IsNotEmpty()
  @IsString()
  public readonly nickname: string;
  @IsNotEmpty()
  @IsString()
  public readonly username: string;

  @IsEmail() public readonly email: string;
  @IsMobilePhone('zh-CN') public readonly mobile: string;
  @IsString() public readonly avatar: string = './assets/tmp/img/avatar.jpg';
  @IsBoolean() public readonly enabled?: boolean;
  @IsString() public readonly description: string = '';
}
