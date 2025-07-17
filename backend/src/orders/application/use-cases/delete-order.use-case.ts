import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { LoggerPort } from '../ports/logger.port';
import { ORDER_REPOSITORY_PORT, LOGGER_PORT } from '../ports/tokens';

export interface DeleteOrderCommand {
  id: string;
}

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_PORT)
    private readonly orderRepository: OrderRepositoryPort,
    @Inject(LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async execute(command: DeleteOrderCommand): Promise<void> {
    const orderId = OrderId.fromString(command.id);

    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Pedido no encontrado');
    }

    await this.orderRepository.delete(orderId);
    await this.logger.info(`Pedido ${command.id} eliminado`, 'orders');
  }
}
