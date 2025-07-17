import { IsString, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  cliente: string;

  @IsString()
  producto: string;
}
