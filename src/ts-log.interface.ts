import type { ISettingsParam } from 'tslog/dist/types/interfaces';
import { IMeta } from 'tslog/dist/types/interfaces';

export interface ILogObj {
  [name: string]: unknown;
}
export interface ILogObjMeta {
  [name: string]: IMeta;
}

export interface TsLogModuleOptions {
  tslogOptions?: {
    settings?: ISettingsParam<ILogObj & ILogObjMeta>;
    logObj?: ILogObj & ILogObjMeta;
  };
  additionalOptions?: Record<string, unknown>;
}
