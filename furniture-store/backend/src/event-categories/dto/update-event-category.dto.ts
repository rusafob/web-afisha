
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateEventCategoryDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  readonly name?: string;
}