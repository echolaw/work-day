import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyPassword {
  @IsNotEmpty()
  @IsString()
  public readonly newPassword: string;
}
