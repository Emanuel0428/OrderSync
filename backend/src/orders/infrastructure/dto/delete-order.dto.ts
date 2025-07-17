import { IsString } from 'class-validator';

export class DeleteOrderDto {
  @IsString()
  id: string;
}
