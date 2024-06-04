import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGrowHistoryDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsString()
  @IsNotEmpty()
  plantId: string;
}
