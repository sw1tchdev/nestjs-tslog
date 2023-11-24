<p align="center">
    <img src="media/nestjs-tslog.svg" alt="Logo" width="273" height="120" />
</p>
<h1 align="center">NestJs-Tslog</h1>
<p align="center">Tslog integration for Nestjs</p>

## Install

```bash
npm install nestjs-tslog tslog
```

## Quick Start

Import `TsLogModule` into the root `AppModule` and use the `forRoot()` method to configure it.

```ts
import { Module } from '@nestjs/common';
import { TslogModule } from 'nestjs-tslog';

@Module({
  imports: [
    TslogModule.forRoot({
      // options
    }),
  ],
})
export class AppModule {}
```

Or you can choose async configuration and use the `forRootAsync()` method to configure it.

```ts
import { Module } from '@nestjs/common';
import { TslogModule } from 'nestjs-tslog';

@Module({
  imports: [
    TslogModule.forRootAsync({
      useFactory: async () => {
        return {
          // options 
        };
      },
    }),
  ],
})
export class AppModule {}
```

Afterward, the `tslog` instance will be available to inject across entire project (and in your feature modules, being `TslogModule` a global one) using the `InjectTsLogger` injection decorator:

```ts
import { Controller, Inject } from '@nestjs/common';
import { InjectTsLogger } from 'nestjs-tslog';
import type { Logger } from 'tslog';

@Controller('example')
export class ExampleController {
constructor(@InjectTsLogger() private readonly logger: Logger) { }
}
```

Or you can replace default Nest Logger:

```ts
import { TslogModule } from 'nestjs-tslog';
// ...
const app = await NestFactory.create(AppModule, { bufferLogs: true });
app.useLogger(app.get(TslogLogger));
// ...
```

## Run Tests

```bash
npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
 
This project is [MIT](https://github.com/sw1tchdev/nestjs-tslog/blob/main/LICENSE) licensed.
