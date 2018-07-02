import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Base } from '../common/entity/base.entity';

@Entity()
export class Group extends Base {
  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  public name: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  public code: string;

  public toJSON() {
    return this;
  }
}
