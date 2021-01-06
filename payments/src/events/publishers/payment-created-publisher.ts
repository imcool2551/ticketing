import { Subjects, Publisher, PaymentCreatedEvent } from '@wswtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
