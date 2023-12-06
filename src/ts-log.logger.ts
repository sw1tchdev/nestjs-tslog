import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'tslog';
import { ILogObj, ILogObjMeta, TsLogModuleOptions } from './ts-log.interface';
import { InjectAdditionalOptions, InjectTsLogger } from './ts-log.decorator';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'silly' | 'trace' | 'fatal';

@Injectable()
export class TslogLogger implements LoggerService {
  constructor(
    @InjectTsLogger() protected readonly logger: Logger<ILogObj & ILogObjMeta>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @InjectAdditionalOptions() additionalOptions: Omit<TsLogModuleOptions, 'tslogOptions'>,
  ) {}

  verbose(message: any, ...optionalParams: unknown[]) {
    this.internalLog('trace', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: unknown[]) {
    this.internalLog('debug', message, ...optionalParams);
  }

  log(message: any, ...optionalParams: unknown[]) {
    this.internalLog('info', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: unknown[]) {
    this.internalLog('warn', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: unknown[]) {
    this.internalLog('error', message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: unknown[]) {
    this.internalLog('fatal', message, ...optionalParams);
  }

  private internalLog(level: LogLevel, message: any, ...optionalParams: unknown[]) {
    const [context, params] = this.parseContext(optionalParams);
    this.logger.getSubLogger({ name: context })[level](message, ...params);
  }

  private parseContext(optionalParams: unknown[]): [context: string, params: unknown[]] {
    if (optionalParams.length === 0) {
      return ['unknown-context', []];
    }

    const unknownLastParam = optionalParams[optionalParams.length - 1];

    return [typeof unknownLastParam === 'string' ? unknownLastParam : 'unknown-context', optionalParams.slice(0, -1)];
  }
}
