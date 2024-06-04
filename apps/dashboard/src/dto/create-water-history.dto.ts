import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateWaterHistoryDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  plantId: string;
}
