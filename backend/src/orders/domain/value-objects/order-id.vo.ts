import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class OrderId {
  private readonly _value: string;

  constructor(value: string) {
    this.ensureIsValid(value);
    this._value = value;
  }

  static generate(): OrderId {
    return new OrderId(uuidv4());
  }

  static fromString(value: string): OrderId {
    return new OrderId(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: OrderId): boolean {
    return this._value === other._value;
  }

  private ensureIsValid(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
    if (!uuidValidate(value)) {
      throw new Error('OrderId must be a valid UUID');
    }
  }
}
