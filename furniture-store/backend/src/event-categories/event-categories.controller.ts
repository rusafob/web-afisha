import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { EventCategory } from './event-category.entity';

@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly categoriesService: EventCategoriesService) {}

  @Get()
  async findAll(): Promise<EventCategory[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  async create(@Body() categoryData: Partial<EventCategory>): Promise<EventCategory> {
    return this.categoriesService.create(categoryData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() categoryData: Partial<EventCategory>,
  ): Promise<EventCategory> {
    return this.categoriesService.update(id, categoryData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }
}