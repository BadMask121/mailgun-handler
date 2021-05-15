import { AwsProvider } from "./aws";
import {
  NotificationProvider,
  NotificationServiceClass,
  NotificationOptions,
} from "./NotifcationServiceClass";

// TODO: write test and create proper type definitions
export class NotificationService {
  protected provider: NotificationServiceClass;
  constructor(provider?: NotificationProvider) {
    switch (provider) {
      case "aws":
        this.provider = new AwsProvider();
        break;
      default:
        this.provider = new AwsProvider();
        break;
    }
  }

  send<U>(message: string, options?: NotificationOptions<U>): Promise<any> {
    return this.provider.send<U>(message, options);
  }
}
