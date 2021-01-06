import { Publisher, Subjects, TicketCreatedEvent } from '@wswtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
