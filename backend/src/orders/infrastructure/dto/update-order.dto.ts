import { IsString, IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  id: string;

  @IsString()
  cliente: string;

  @IsString()
  producto: string;

  @IsIn(['PENDIENTE', 'PREPARANDO', 'ENTREGADO'])
  estado: string;
}
