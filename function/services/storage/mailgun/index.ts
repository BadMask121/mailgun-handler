import { MailGunBody, MailGunServiceClass } from './MailGunStorageClass';

export class MailGunStorageService {
  constructor(private readonly provider: MailGunServiceClass) {}
  save(body: MailGunBody) {
    return this.provider.saveRaw(body);
  }
}
