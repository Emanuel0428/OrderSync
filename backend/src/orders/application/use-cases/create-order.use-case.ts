import { Injectable, Inject } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { Customer } from '../../domain/value-objects/customer.vo';
import { Product } from '../../domain/value-objects/product.vo';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { LoggerPort } from '../ports/logger.port';
import { ORDER_REPOSITORY_PORT, LOGGER_PORT } from '../ports/tokens';

export interface CreateOrderCommand {
  customer: string;
  product: string;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_PORT)
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async execute(command: CreateOrderCommand): Promise<{ id: string }> {
    const customer = Customer.fromString(command.customer);
    const product = Product.fromString(command.product);

    const order = Order.create(customer, product);

    await this.orderRepository.save(order);

    // Procesar eventos de dominio
    const events = order.pullDomainEvents();
    for (const event of events) {
      if (event.eventName === 'OrderCreated') {
        await this.logger.info(
          `Se creó un pedido de ${customer.value} para ${product.value}`,
          'orders',
        );
      }
    }

    return { id: order.id.value };
  }
}
