import { Controller } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectTsLogger, TsLogModule } from '../src';
import { Logger } from 'tslog';

describe('check decorator', () => {
  describe('InjectTsLogger', () => {
    let loggerOneInstance: Logger<unknown> | undefined;
    let loggerTwoInstance: Logger<unknown> | undefined;

    it('different instance (Transient scope)', async () => {
      @Controller('/one')
      class TestOneController {
        constructor(@InjectTsLogger() private readonly logger: Logger<unknown>) {
          loggerOneInstance = this.logger;
        }
      }

      @Controller('/two')
      class TestTwoController {
        constructor(@InjectTsLogger() private readonly logger: Logger<unknown>) {
          loggerTwoInstance = this.logger;
        }
      }

      const moduleRef = await Test.createTestingModule({
        imports: [TsLogModule.register({})],
        controllers: [TestOneController, TestTwoController],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      expect(loggerOneInstance).toBeDefined();
      expect(loggerTwoInstance).toBeDefined();
      expect(loggerOneInstance).not.toBe(loggerTwoInstance);
    });
  });
});
