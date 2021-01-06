import { Publisher, OrderCancelledEvent, Subjects } from '@wswtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
