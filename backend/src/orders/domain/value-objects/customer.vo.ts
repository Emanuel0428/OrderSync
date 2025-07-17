export class Customer {
  private readonly _value: string;

  constructor(value: string) {
    this.ensureIsValid(value);
    this._value = value;
  }

  static fromString(value: string): Customer {
    return new Customer(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Customer): boolean {
    return this._value === other._value;
  }

  private ensureIsValid(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('Customer name cannot be empty');
    }
    if (value.trim().length < 2) {
      throw new Error('Customer name must be at least 2 characters long');
    }
    if (value.trim().length > 100) {
      throw new Error('Customer name cannot exceed 100 characters');
    }
  }
}
