import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './ts-log.module-definition';
import { additionalOptionsProvider, tsLogProvider } from './ts-log.provider';
import { TslogLogger } from './ts-log.logger';

@Global()
@Module({
  providers: [TslogLogger, additionalOptionsProvider, tsLogProvider],
  exports: [TslogLogger],
})
export class TsLogModule extends ConfigurableModuleClass {}
