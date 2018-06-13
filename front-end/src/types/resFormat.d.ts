declare module 'resFormat' {
  export interface ITokenData {
    accessToken: string;
    refreshToken: string;
  }

  export interface IRes<T = any> {
    code?: number;
    data?: T;
    err_level?: number;
    extra?: any;
    message?: string;
    runEnv?: string;
  }
}
