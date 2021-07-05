import {
  NotificationOptions,
  NotificationServiceClass,
} from './NotifcationServiceClass';

export class NotificationService {
  constructor(private readonly provider: NotificationServiceClass) {}

  send<U>(message: string, options?: NotificationOptions<U>): Promise<any> {
    return this.provider.send<U>(message, options);
  }
}
