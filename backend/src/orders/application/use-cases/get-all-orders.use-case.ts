import { Injectable, Inject } from '@nestjs/common';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { ORDER_REPOSITORY_PORT } from '../ports/tokens';

export interface OrderResponse {
  id: string;
  customer: string;
  product: string;
  status: string;
  createdAt: Date;
}

@Injectable()
export class GetAllOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY_PORT)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(): Promise<OrderResponse[]> {
    const orders = await this.orderRepository.findAll();

    return orders.map((order) => order.toPrimitives());
  }
}
