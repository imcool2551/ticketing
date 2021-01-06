import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@wswtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
