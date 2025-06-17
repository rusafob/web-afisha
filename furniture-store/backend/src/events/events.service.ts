import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
    });
    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ 
      relations: ['category'],
      order: { date: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ 
      where: { id },
      relations: ['category']
    });
    
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id); // Используем наш findOne с проверкой
    
    Object.assign(event, updateEventDto);
    
    if (updateEventDto.date) {
      event.date = new Date(updateEventDto.date);
    }
    
    return this.eventsRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}