import { ConfigurableModuleBuilder } from '@nestjs/common';
import { TsLogModuleOptions } from './ts-log.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<TsLogModuleOptions>().build();
