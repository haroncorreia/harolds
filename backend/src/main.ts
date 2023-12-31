import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  // Enviroiment variable YAML
  const serverConfig = config.get('server');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  
  const logger = new Logger('Logger');
  logger.log(`Application initialized on port ${port}`);

}

bootstrap();
