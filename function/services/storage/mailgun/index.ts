import { FirebaseProvider } from "./firebase";
import {
  MailGunServiceClass,
  MailGunProviders,
  MailGunBody,
} from "./MailGunStorageClass";

export class MailGunStorageService {
  protected provider: MailGunServiceClass;
  constructor(provider?: MailGunProviders) {
    switch (provider) {
      case "firebase":
        this.provider = new FirebaseProvider();
        break;
      default:
        this.provider = new FirebaseProvider();
        break;
    }
  }
  save(body: MailGunBody) {
    return this.provider.saveRaw(body);
  }
}
