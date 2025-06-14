import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './furniture-type.entity';

@Entity('event_category')
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}