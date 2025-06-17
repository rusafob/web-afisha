import { IsString, IsDateString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string = ''; // Инициализация пустой строкой

  @IsDateString()
  date: string = new Date().toISOString(); // Текущая дата по умолчанию

  @IsString()
  @IsNotEmpty()
  description: string = ''; // Инициализация пустой строкой

  @IsNumber()
  categoryId: number = 0; // Инициализация нулем
}