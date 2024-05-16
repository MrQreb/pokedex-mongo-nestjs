import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //setGlobalPrefix => ante pone a api
  //localhost:3000/api/v2/pokemon
  app.setGlobalPrefix('api/v2');

  //ValidationPipe => Pipe para validar los datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   );

  await app.listen(3000);
}
bootstrap();

