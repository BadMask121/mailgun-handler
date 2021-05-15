export type MailGunProviders = "firebase" | "pgsql";
export type MailGunEvent = "opened" | "clicked" | "delivered";
export interface MailGunBody {
  signature: {
    timestamp: string | number;
    token: string;
    signature: string;
  };
  "event-data": {
    event: MailGunEvent;
    timestamp: number;
    id: string;
  };
}

export abstract class MailGunServiceClass {
  /**
   * saveRaw adds a new unparsed dump of mailgun webhook events to
   * selected database provider
   * @returns @string id
   * @param body
   */
  abstract saveRaw(body: MailGunBody): Promise<string>;
}
