import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventCategory } from './entities/category.entity';
import { Event } from './entities/furniture-type.entity';
import { EventCategoriesController } from './categories/category.controller';
import { EventsController } from './furniture-types/furniture-types.controlle';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'furniture_db',
      entities: [EventCategory, Event],
      synchronize: false,
      migrationsRun: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      logging: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([EventCategory, Event]),
  ],
  controllers: [EventCategoriesController, EventsController],
})
export class AppModule {}
