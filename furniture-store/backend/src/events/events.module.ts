import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { EventCategoriesModule } from '../event-categories/event-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    EventCategoriesModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}