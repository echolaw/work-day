declare module 'resultFormat' {
  export interface IResult<T = any> {
    code?: number;
    data?: T;
    err?: any;
    extra?: any;
    err_level?: number;
    message?: string;
    runEnv?: string;
  }
}
