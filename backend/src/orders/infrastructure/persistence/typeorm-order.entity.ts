import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class TypeOrmOrderEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  customer: string;

  @Column()
  product: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
