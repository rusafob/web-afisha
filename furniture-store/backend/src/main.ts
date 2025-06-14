// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
    console.log('Приложение успешно запущено на порту 3000');
  } catch (error) {
    console.error('Ошибка при запуске приложения:', error);
  }
}
bootstrap();
