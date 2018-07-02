import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyGroup {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;
  @IsString() public readonly description: string;
}
