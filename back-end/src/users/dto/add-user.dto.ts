import { IsNotEmpty, IsString } from 'class-validator';

export class AddUser {
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
}
