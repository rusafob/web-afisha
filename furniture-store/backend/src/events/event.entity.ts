import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventCategory } from '../event-categories/event-category.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number; // Добавлен оператор утверждения definite assignment (!)

  @Column()
  title!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column('text')
  description!: string;

  @ManyToOne(() => EventCategory, category => category.events)
  category!: EventCategory;
}