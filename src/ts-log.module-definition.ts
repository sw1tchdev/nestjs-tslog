import { ConfigurableModuleBuilder } from '@nestjs/common';
import { TsLogModuleOptions } from './ts-log.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<TsLogModuleOptions>().setClassMethodName('forRoot').build();
