import { Publisher, Subjects, TicketUpdatedEvent } from '@wswtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
