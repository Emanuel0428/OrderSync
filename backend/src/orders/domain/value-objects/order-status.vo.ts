export enum OrderStatusEnum {
  PENDING = 'PENDIENTE',
  PREPARING = 'PREPARANDO',
  DELIVERED = 'ENTREGADO',
}

export class OrderStatus {
  private readonly _value: OrderStatusEnum;

  constructor(value: OrderStatusEnum) {
    this._value = value;
  }

  static pending(): OrderStatus {
    return new OrderStatus(OrderStatusEnum.PENDING);
  }

  static preparing(): OrderStatus {
    return new OrderStatus(OrderStatusEnum.PREPARING);
  }

  static delivered(): OrderStatus {
    return new OrderStatus(OrderStatusEnum.DELIVERED);
  }

  static fromString(value: string): OrderStatus {
    const validStatuses = Object.values(OrderStatusEnum);
    if (!validStatuses.includes(value as OrderStatusEnum)) {
      throw new Error(`Invalid order status: ${value}`);
    }
    return new OrderStatus(value as OrderStatusEnum);
  }

  get value(): string {
    return this._value;
  }

  equals(other: OrderStatus): boolean {
    return this._value === other._value;
  }

  isPending(): boolean {
    return this._value === OrderStatusEnum.PENDING;
  }

  isPreparing(): boolean {
    return this._value === OrderStatusEnum.PREPARING;
  }

  isDelivered(): boolean {
    return this._value === OrderStatusEnum.DELIVERED;
  }
}
