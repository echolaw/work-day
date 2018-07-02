import { Entity, Column, ObjectIdColumn, ObjectID, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsString, IsNotEmpty, IsArray, IsBoolean, IsMobilePhone, IsEmail, IsNumber } from 'class-validator';
import { Base } from '../common/entity/base.entity';

@Entity()
export class User extends Base {
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
  @IsEmail()
  @Index({ unique: true })
  public email: string;
  /**
   * 手机号
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  @Index({ unique: true })
  public mobile: string;

  @Column()
  @IsString()
  public avatar: string = './assets/tmp/img/avatar.jpg';

  /**
   * @description user | manager | su
   */
  @Column()
  @IsArray()
  public roles: string[] = ['user'];

  @Column()
  @IsArray()
  public groups: string[] = ['default'];

  @Column()
  @IsBoolean()
  public enabled: boolean = false;
  @Column()
  @IsNumber()
  public status: number = 0;

  @Column() public description: string;

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
