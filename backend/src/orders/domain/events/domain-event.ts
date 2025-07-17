export interface DomainEvent {
  readonly aggregateId: string;
  readonly eventName: string;
  readonly occurredOn: Date;
  readonly eventId: string;
}
