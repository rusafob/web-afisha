import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from './event-category.entity';

@Injectable()
export class EventCategoriesService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly categoryRepository: Repository<EventCategory>,
  ) {}

  async findAll(): Promise<EventCategory[]> {
    return this.categoryRepository.find();
  }

  async create(categoryData: Partial<EventCategory>): Promise<EventCategory> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    categoryData: Partial<EventCategory>,
  ): Promise<EventCategory> {
    await this.categoryRepository.update(id, categoryData);
    const updated = await this.categoryRepository.findOne({ where: { id } });
    if (!updated) throw new NotFoundException('Category not found');
    return updated;
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Category not found');
    }
  }
}