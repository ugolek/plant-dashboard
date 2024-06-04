import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsNotEmpty()
  coordinate: [number, number];
}
