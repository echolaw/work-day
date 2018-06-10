declare module 'resFormat' {
  export interface IRes<T> {
    code?: number;
    data?: T;
    err_level?: number;
    extra?: any;
    message?: string;
    runEnv?: string;
  }
}
