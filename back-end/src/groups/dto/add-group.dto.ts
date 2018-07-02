import { IsNotEmpty, IsString } from 'class-validator';

export class AddGroup {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;
  @IsNotEmpty()
  @IsString()
  public readonly code: string;
  @IsString() public readonly description: string;
}
