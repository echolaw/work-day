import { IRes } from 'resFormat';

export class ResFormat<T> {
  private _res: IRes<T>;
  constructor() {
    this._res = {
      code: -1,
      err_level: -1,
      extra: '',
      message: ''
    };
  }

  public succeed(resInfo: IRes<T> = {}): IRes<T> {
    this._res = {
      code: 0,
      err_level: 0,
      extra: '',
      message: '操作成功'
    };
    Object.assign(this._res, resInfo);
    return this._res;
  }
  public failLevel0(resInfo: IRes<T> = {}): IRes<T> {
    this._res = {
      code: 1,
      err_level: 0,
      extra: '',
      message: '操作失败, 错误等级: 0'
    };
    Object.assign(this._res, resInfo);
    return this._res;
  }

  public failLevel1(resInfo: IRes<T> = {}): IRes<T> {
    this._res = {
      code: 1,
      err_level: 1,
      extra: '',
      message: '操作失败, 错误等级: 1'
    };
    Object.assign(this._res, resInfo);
    return this._res;
  }

  public failLevel2(resInfo: IRes<T> = {}): IRes<T> {
    this._res = {
      code: 1,
      err_level: 2,
      extra: '',
      message: '操作失败, 错误等级: 2'
    };
    Object.assign(this._res, resInfo);
    return this._res;
  }
}
