import { Order } from '../../domain/entities/order.entity';
import { OrderId } from '../../domain/value-objects/order-id.vo';

export interface OrderRepositoryPort {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  delete(id: OrderId): Promise<void>;
}
