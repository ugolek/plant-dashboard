import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateFertilizeHistoryDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
  
  @IsString()
  @IsNotEmpty()
  plantId: string;
}
