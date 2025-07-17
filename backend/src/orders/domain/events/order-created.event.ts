import { v4 as uuidv4 } from 'uuid';
import { DomainEvent } from './domain-event';
import { Order } from '../entities/order.entity';

export class OrderCreatedEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly eventName: string = 'OrderCreated';
  readonly occurredOn: Date;
  readonly eventId: string;
  readonly order: Order;

  constructor(order: Order) {
    this.aggregateId = order.id.value;
    this.occurredOn = new Date();
    this.eventId = uuidv4();
    this.order = order;
  }
}
