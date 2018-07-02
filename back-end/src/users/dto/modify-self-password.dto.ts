import { IsNotEmpty, IsString } from 'class-validator';

export class ModifySelfPassword {
  @IsNotEmpty()
  @IsString()
  public readonly password?: string;
  @IsNotEmpty()
  @IsString()
  public readonly newPassword: string;
}
