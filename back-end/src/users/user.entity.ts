import { Entity, Column, ObjectIdColumn, ObjectID, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AddUser } from './dto/add-user.dto';
import { IsString, IsNotEmpty } from 'class-validator';
import { serialize } from 'class-transformer';

@Entity()
export class User {
  /**
   * User Id
   */
  @ObjectIdColumn() public id: ObjectID;

  /**
   * 用户登录名称
   */
  @Column() public nickname: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  public username: string;

  /**
   * 密码的hash值, 并非密码明文
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  public password: string;

  /**
   * 电子邮箱
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  public email: string;

  public setPassword(plainTextPassword: string) {
    const saltRounds = 2;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(plainTextPassword, salt);
  }

  public async validatePassword(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password + '');
  }

  public toJSON() {
    delete this.password;
    return this;
  }
}
