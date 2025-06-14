import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Event } from '../entities/furniture-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from '../entities/category.entity';

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    @InjectRepository(EventCategory)
    private categoryRepo: Repository<EventCategory>,
  ) {}

  @Get()
  index(): Promise<Event[]> {
    return this.eventRepo.find({ relations: ['category'] });
  }

  @Post()
  async create(@Body() eventData: Event): Promise<any> {
    const category = await this.categoryRepo.findOneBy({ id: eventData.category.id });
    if (!category) {
      return { error: 'Category not found' };
    }
    return this.eventRepo.save({
      ...eventData,
      category,
    });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() eventData: Event): Promise<any> {
    eventData.id = Number(id);
    if (eventData.category) {
      const category = await this.categoryRepo.findOneBy({ id: eventData.category.id });
      if (!category) {
        return { error: 'Category not found' };
      }
      eventData.category = category;
    }
    return this.eventRepo.save(eventData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.eventRepo.delete(id);
  }
}