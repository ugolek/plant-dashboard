import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNeighborsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  relation: string;
  
  @IsString()
  @IsNotEmpty()
  plantId: string;
}
