import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './Presentation/Filters/http-exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});

  app.use((cookieParser as any)());
  app.setGlobalPrefix('api.parking/v1');
  
  const config = new DocumentBuilder()
  .setTitle("Statment Parking API")
  .setDescription("Api desenvolvida para gestao de estancionamento")
  .setVersion("1.0")
  .addBearerAuth({
    type:"http",
    scheme:"bearer",
    bearerFormat:"JWT",
    name:"Authorization",
    in:"bearer",
  }, "accessToken")
  .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api.parking/v1/docs', app, document)
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError:true,
      exceptionFactory: (errors) => {
      for (const error of errors) {
        if (error.constraints) {
          const message = Object.values(error.constraints)[0];
          return new BadRequestException(message);
        }
      }
      return new BadRequestException('Dados inválidos');
  },
}));                                                            

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();