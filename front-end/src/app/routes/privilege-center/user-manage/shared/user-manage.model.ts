export class UserManage {
  id: number;
  nickname: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
  roles: string[];
  groups: string[];
  enabled: boolean;
  description: string;
}

export class ModifyPassword {
  public newPassword: string;
}

export class ModifyUser {
  public nickname: string;

  public username: string;

  public email: string;
  public mobile: string;
  public avatar: string;
  public enabled?: boolean;
  public description: string;
}
