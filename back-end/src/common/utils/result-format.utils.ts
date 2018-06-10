import { IResult } from 'resultFormat';

export class ResultFormat<T> {
  private _result: IResult<T>;
  constructor() {
    this._result = {
      code: -1,
      extra: '',
      message: ''
    };
  }

  public succeed0(resultInfo: IResult<T> = {}): IResult<T> {
    this._result = {
      code: 0,
      err_level: 0,
      message: '操作成功'
    };
    Object.assign(this._result, resultInfo);
    return this._result;
  }

  public succeed1(resultInfo: IResult<T> = {}): IResult<T> {
    this._result = {
      code: 0,
      err_level: 1,
      message: '操作成功'
    };
    Object.assign(this._result, resultInfo);
    return this._result;
  }

  public failLevel0(resultInfo: IResult<T> = {}): IResult<T> {
    this._result = {
      code: 1,
      err_level: 0,
      message: '操作失败, 错误等级: 0'
    };
    Object.assign(this._result, resultInfo);
    return this._result;
  }

  public failLevel1(resultInfo: IResult<T> = {}): IResult<T> {
    this._result = {
      code: 1,
      err_level: 1,
      message: '操作失败, 错误等级: 1'
    };
    Object.assign(this._result, resultInfo);
    return this._result;
  }

  public failLevel2(resultInfo: IResult<T> = {}): IResult<T> {
    this._result = {
      code: 1,
      err_level: 2,
      message: '操作失败, 错误等级: 2'
    };
    Object.assign(this._result, resultInfo);
    return this._result;
  }
}
