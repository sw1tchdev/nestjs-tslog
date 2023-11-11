import { Provider, Scope } from '@nestjs/common';
import { ADDITIONAL_OPTIONS_PROVIDER, TSLOG_INJECT_TOKEN } from './ts-log.constant';
import { MODULE_OPTIONS_TOKEN } from './ts-log.module-definition';
import { TsLogModuleOptions } from './ts-log.interface';
import { Logger } from 'tslog';

export const tsLogProvider: Provider = {
  provide: TSLOG_INJECT_TOKEN,
  inject: [MODULE_OPTIONS_TOKEN],
  useFactory: async ({ tslogOptions }: TsLogModuleOptions) => {
    return new Logger(tslogOptions?.settings, tslogOptions?.logObj);
  },
};

export const additionalOptionsProvider: Provider = {
  provide: ADDITIONAL_OPTIONS_PROVIDER,
  inject: [MODULE_OPTIONS_TOKEN],
  useFactory: async (tsLogModuleOptions: TsLogModuleOptions) => {
    return { additionalOptions: tsLogModuleOptions.additionalOptions };
  },
  scope: Scope.TRANSIENT,
};
