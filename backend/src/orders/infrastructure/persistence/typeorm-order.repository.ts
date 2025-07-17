import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../domain/entities/order.entity';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { OrderRepositoryPort } from '../../application/ports/order-repository.port';
import { TypeOrmOrderEntity } from './typeorm-order.entity';

@Injectable()
export class TypeOrmOrderRepository implements OrderRepositoryPort {
  private readonly logger = new Logger(TypeOrmOrderRepository.name);

  constructor(
    @InjectRepository(TypeOrmOrderEntity)
    private readonly repository: Repository<TypeOrmOrderEntity>,
  ) {}

  async save(order: Order): Promise<void> {
    const primitives = order.toPrimitives();
    this.logger.log('Saving order:', primitives);
    
    const entity = this.repository.create({
      id: primitives.id,
      customer: primitives.customer,
      product: primitives.product,
      status: primitives.status,
      createdAt: primitives.createdAt,
    });
    
    const saved = await this.repository.save(entity);
    this.logger.log('Order saved successfully:', saved);
  }

  async findById(id: OrderId): Promise<Order | null> {
    this.logger.log(`Finding order by ID: ${id.value}`);
    const entity = await this.repository.findOne({
      where: { id: id.value },
    });

    if (!entity) {
      this.logger.log('Order not found');
      return null;
    }

    this.logger.log('Order found:', entity);
    return Order.fromPrimitives({
      id: entity.id,
      customer: entity.customer,
      product: entity.product,
      status: entity.status,
      createdAt: entity.createdAt,
    });
  }

  async findAll(): Promise<Order[]> {
    this.logger.log('Finding all orders');
    const entities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`Found ${entities.length} entities in database:`, entities);

    const orders = entities.map((entity) =>
      Order.fromPrimitives({
        id: entity.id,
        customer: entity.customer,
        product: entity.product,
        status: entity.status,
        createdAt: entity.createdAt,
      }),
    );

    this.logger.log(`Mapped to ${orders.length} domain orders`);
    return orders;
  }

  async delete(id: OrderId): Promise<void> {
    this.logger.log(`Deleting order with ID: ${id.value}`);
    const result = await this.repository.delete(id.value);
    this.logger.log('Delete result:', result);
  }
}
