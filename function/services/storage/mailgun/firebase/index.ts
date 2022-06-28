import admin from "firebase-admin";

import { MailGunBody, MailGunServiceClass } from "../MailGunStorageClass";
import { MailGunServiceError } from "../MailGunStorageError";

/**
 * @param serviceAccount should be a path to your firebase IAM account service
 * key json file
 */
const serviceAccount = require("./receeve-service-account.json");

export class FirebaseProvider extends MailGunServiceClass {
  protected db: FirebaseFirestore.Firestore;
  constructor() {
    super();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    this.db = admin.firestore();
  }

  async saveRaw(body: MailGunBody): Promise<string | null> {
    try {
      const result = await this.db.collection("MAILGUN_DUMP").add(body);
      if (result) return result.id;

      return null;
    } catch (error) {
      throw new MailGunServiceError(error);
    }
  }
}
