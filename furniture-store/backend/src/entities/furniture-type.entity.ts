import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventCategory } from './category.entity';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => EventCategory, (category) => category.events, { onDelete: 'CASCADE' })
  category: EventCategory;
}