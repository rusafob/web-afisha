import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from './event-category.entity';
import { EventCategoriesService } from './event-categories.service';
import { EventCategoriesController } from './event-categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  providers: [EventCategoriesService],
  controllers: [EventCategoriesController],
  exports: [EventCategoriesService]
})
export class EventCategoriesModule {}