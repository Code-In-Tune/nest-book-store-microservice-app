import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { SalesModule } from './sales/sale.module';
import { BooksModule } from './books/books.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new DomainExceptionFilter());

  const booksConfig = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('CRUD API for books')
    .setVersion('1.0')
    .addTag('books')
    .build();

  const salesConfig = new DocumentBuilder()
    .setTitle('Sales API')
    .setDescription('Documentazione del modulo sales')
    .setVersion('1.0')
    .build();

  const booksDocument = SwaggerModule.createDocument(app, booksConfig, {
    include: [BooksModule],
  });

  const salesDocument = SwaggerModule.createDocument(app, salesConfig, {
    include: [SalesModule],
  });
  SwaggerModule.setup('docs/books', app, booksDocument);
  SwaggerModule.setup('docs/sales', app, salesDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
