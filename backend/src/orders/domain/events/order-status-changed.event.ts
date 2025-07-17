import { v4 as uuidv4 } from 'uuid';
import { DomainEvent } from './domain-event';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../value-objects/order-status.vo';

export class OrderStatusChangedEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly eventName: string = 'OrderStatusChanged';
  readonly occurredOn: Date;
  readonly eventId: string;
  readonly order: Order;
  readonly previousStatus: OrderStatus;
  readonly newStatus: OrderStatus;

  constructor(
    order: Order,
    previousStatus: OrderStatus,
    newStatus: OrderStatus,
  ) {
    this.aggregateId = order.id.value;
    this.occurredOn = new Date();
    this.eventId = uuidv4();
    this.order = order;
    this.previousStatus = previousStatus;
    this.newStatus = newStatus;
  }
}
