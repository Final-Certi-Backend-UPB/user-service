import { NestFactory } from '@nestjs/core';
import { ValidationPrinterPipe } from './validation/validation.printer.pipe';
import { env } from './config/config';
import { UserModule } from './user.module';
import { EurekaService } from './services/eureka.service';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  
  const eureka = new EurekaService();

  app.useGlobalPipes(new ValidationPrinterPipe());

  await app.listen(env.port);
}
bootstrap();
