import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(
    'App Running'
  )
  // Defino el nombre a la ruta
  app.setGlobalPrefix('api');

  // Despues de instalar el validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(process.env.PORT);
  logger.log(`the App is running on port ${process.env.PORT}`)
}
main();
