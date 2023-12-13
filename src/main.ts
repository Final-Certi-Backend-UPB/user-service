import { NestFactory } from '@nestjs/core';
import { ValidationPrinterPipe } from './validation/validation.printer.pipe';
import { env } from './config/config';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  
  app.useGlobalPipes(new ValidationPrinterPipe());

  await app.listen(env.port);
}
bootstrap();
