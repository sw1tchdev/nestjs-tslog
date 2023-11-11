import { Controller, Get, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TsLogModule, TslogLogger } from '../src';

describe('module initialization', () => {
  let consoleLogMock: jest.Spied<typeof console.log> | undefined;

  beforeEach(async () => {
    consoleLogMock = jest.spyOn(console, 'log');
    consoleLogMock.mockImplementation(() => void 0);
  });

  afterEach(() => {
    consoleLogMock?.mockRestore();
  });

  describe('register', () => {
    it('should work properly without params', async () => {
      @Controller('/')
      class TestController {
        private readonly logger = new Logger(TestController.name);

        @Get('/')
        get() {
          this.logger.log('Test-string');
          return {};
        }
      }

      const moduleRef = await Test.createTestingModule({
        imports: [TsLogModule.register({})],
        controllers: [TestController],
      }).compile();

      const tslogLogger = moduleRef.get<TslogLogger>(TslogLogger);
      moduleRef.useLogger(tslogLogger);

      const app = moduleRef.createNestApplication();
      await app.init();

      const testController = moduleRef.get<TestController>(TestController);
      testController.get();

      expect(tslogLogger).toBeDefined();
      expect(consoleLogMock).toHaveBeenCalled();
      expect(consoleLogMock?.mock?.lastCall?.[0]).toContain('Test-string');
    });

    it('should work properly with params', async () => {
      @Controller('/')
      class TestController {
        private readonly logger = new Logger(TestController.name);

        @Get('/')
        get() {
          this.logger.log({ hello: 'world' });
          return {};
        }
      }

      const moduleRef = await Test.createTestingModule({
        imports: [TsLogModule.register({ tslogOptions: { settings: { name: 'Test', type: 'json' } } })],
        controllers: [TestController],
      }).compile();

      const tslogLogger = moduleRef.get<TslogLogger>(TslogLogger);
      moduleRef.useLogger(tslogLogger);

      const app = moduleRef.createNestApplication();
      await app.init();

      const testController = moduleRef.get<TestController>(TestController);
      testController.get();

      expect(tslogLogger).toBeDefined();
      expect(consoleLogMock?.mock?.lastCall?.[0]).toContain('"hello":"world"');
    });
  });
});
