import { OrderId } from '../value-objects/order-id.vo';
import { OrderStatus } from '../value-objects/order-status.vo';
import { Customer } from '../value-objects/customer.vo';
import { Product } from '../value-objects/product.vo';
import { DomainEvent } from '../events/domain-event';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrderStatusChangedEvent } from '../events/order-status-changed.event';

export class Order {
  private _id: OrderId;
  private _customer: Customer;
  private _product: Product;
  private _status: OrderStatus;
  private _createdAt: Date;
  private _domainEvents: DomainEvent[] = [];

  constructor(
    id: OrderId,
    customer: Customer,
    product: Product,
    status: OrderStatus,
    createdAt: Date,
  ) {
    this._id = id;
    this._customer = customer;
    this._product = product;
    this._status = status;
    this._createdAt = createdAt;
  }

  static create(customer: Customer, product: Product): Order {
    const order = new Order(
      OrderId.generate(),
      customer,
      product,
      OrderStatus.pending(),
      new Date(),
    );

    order.addDomainEvent(new OrderCreatedEvent(order));
    return order;
  }

  static fromPrimitives(data: {
    id: string;
    customer: string;
    product: string;
    status: string;
    createdAt: Date;
  }): Order {
    return new Order(
      OrderId.fromString(data.id),
      Customer.fromString(data.customer),
      Product.fromString(data.product),
      OrderStatus.fromString(data.status),
      data.createdAt,
    );
  }

  changeStatus(newStatus: OrderStatus): void {
    if (this._status.equals(newStatus)) {
      return;
    }

    const previousStatus = this._status;
    this._status = newStatus;

    this.addDomainEvent(
      new OrderStatusChangedEvent(this, previousStatus, newStatus),
    );
  }

  canBeDelivered(): boolean {
    return this._status.isPreparing();
  }

  canBeCancelled(): boolean {
    return this._status.isPending() || this._status.isPreparing();
  }

  toPrimitives(): {
    id: string;
    customer: string;
    product: string;
    status: string;
    createdAt: Date;
  } {
    return {
      id: this._id.value,
      customer: this._customer.value,
      product: this._product.value,
      status: this._status.value,
      createdAt: this._createdAt,
    };
  }

  private addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  // Getters
  get id(): OrderId {
    return this._id;
  }

  get customer(): Customer {
    return this._customer;
  }

  get product(): Product {
    return this._product;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }
}
