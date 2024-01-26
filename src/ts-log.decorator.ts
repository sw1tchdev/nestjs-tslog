import { Inject } from '@nestjs/common';
import { TSLOG_INJECT_TOKEN, ADDITIONAL_OPTIONS_PROVIDER } from './ts-log.constant';

export const InjectTsLogger = () => Inject(TSLOG_INJECT_TOKEN);
export const InjectAdditionalOptions = () => Inject(ADDITIONAL_OPTIONS_PROVIDER);
