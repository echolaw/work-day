import { Entity, Column, ObjectIdColumn, ObjectID, Index } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class AppSet {
  /**
   * User Id
   */
  @ObjectIdColumn() public id: ObjectID;

  @Column()
  @IsString()
  @Index({ unique: true })
  public name: string;
  @Column()
  @IsString()
  public description: string;

  public toJSON() {
    return this;
  }
}
