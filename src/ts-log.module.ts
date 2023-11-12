import { DynamicModule, Global, Module } from '@nestjs/common';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './ts-log.module-definition';
import { additionalOptionsProvider, tsLogProvider } from './ts-log.provider';
import { TslogLogger } from './ts-log.logger';

@Global()
@Module({
  providers: [TslogLogger, additionalOptionsProvider, tsLogProvider],
  exports: [TslogLogger, tsLogProvider],
})
export class TslogModule extends ConfigurableModuleClass {
  static forRoot(options?: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.forRoot(options ?? {}),
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      ...super.forRootAsync(options),
    };
  }
}
