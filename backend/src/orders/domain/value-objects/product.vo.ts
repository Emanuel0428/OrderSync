export class Product {
  private readonly _value: string;

  constructor(value: string) {
    this.ensureIsValid(value);
    this._value = value;
  }

  static fromString(value: string): Product {
    return new Product(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Product): boolean {
    return this._value === other._value;
  }

  private ensureIsValid(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }
    if (value.trim().length < 2) {
      throw new Error('Product name must be at least 2 characters long');
    }
    if (value.trim().length > 200) {
      throw new Error('Product name cannot exceed 200 characters');
    }
  }
}
