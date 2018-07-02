export interface IUser {
  readonly nickname: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly mobile: string;
  readonly roles: string[];
  readonly groups: string[];
  readonly enabled: boolean;
  readonly description: string;
}
