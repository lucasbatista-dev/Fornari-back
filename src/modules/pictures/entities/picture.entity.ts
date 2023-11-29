import { randomUUID } from 'crypto';

export class Picture {
  readonly id: string;
  url: string;
  clientid: string;

  constructor() {
    this.id = randomUUID();
  }
}
