import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  // Queue group
  // # 1. NATS server sends event to only one member of queue group.
  // # 2. Prevent NATS server from dumping durable subscriptions at client disconnection
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        .setAckWait(this.ackWait)
        // subscription have to manually ack the sent events
        .setManualAckMode(true)
        // NATS Server sends events to subscriptions for very first time
        .setDeliverAllAvailable()
        // NATS Server only send unacked events to subscriptions
        .setDurableName('accounting-service')
    );
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`);

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
