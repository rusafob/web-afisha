import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventCategory } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('event-categories')
export class EventCategoriesController {
  constructor(
    @InjectRepository(EventCategory)
    private categoryRepo: Repository<EventCategory>,
  ) {}

  @Get()
  index(): Promise<EventCategory[]> {
    return this.categoryRepo.find();
  }

  @Post()
  async create(@Body() categoryData: EventCategory): Promise<any> {
    return this.categoryRepo.save(categoryData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() categoryData: EventCategory): Promise<any> {
    categoryData.id = Number(id);
    return this.categoryRepo.save(categoryData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.categoryRepo.delete(id);
  }
}