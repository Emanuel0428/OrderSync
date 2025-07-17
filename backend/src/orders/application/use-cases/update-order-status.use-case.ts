import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { OrderStatus } from '../../domain/value-objects/order-status.vo';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { LoggerPort } from '../ports/logger.port';
import { ORDER_REPOSITORY_PORT, LOGGER_PORT } from '../ports/tokens';

export interface UpdateOrderStatusCommand {
  id: string;
  status: string;
}

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_PORT)
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async execute(command: UpdateOrderStatusCommand): Promise<void> {
    const orderId = OrderId.fromString(command.id);
    const newStatus = OrderStatus.fromString(command.status);

    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Pedido no encontrado');
    }

    order.changeStatus(newStatus);
    await this.orderRepository.save(order);

    // Procesar eventos de dominio
    const events = order.pullDomainEvents();
    for (const event of events) {
      if (event.eventName === 'OrderStatusChanged') {
        await this.logger.info(
          `El pedido ${command.id} cambió a estado ${command.status}`,
          'orders',
        );
      }
    }
  }
}
