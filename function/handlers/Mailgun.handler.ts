import {
  formatError,
  formatResponse,
  serialize,
  verifyMailgunRequest,
} from "../helpers";
import { MailGunStorageService } from "../services/storage";
import { NotificationService } from "../services/sns/index";

const testKey = "ffddc2cec4657c3c2b8136acb9def32b-602cc1bf-f69c4a34";

export default async (event: any, context: any) => {
  try {
    const body =
      typeof event.body !== "object" ? JSON.parse(event.body) : event.body;

    const signature = {
      signature: body.signature.signature,
      token: body.signature.token,
      timestamp: body.signature.timestamp,
    };

    const eventBody = body["event-data"];

    const isValidRequest = verifyMailgunRequest({
      ...signature,
      signingKey: process.env.MAILGUN_SIGNING_KEY || (testKey as string),
    });

    if (!isValidRequest) throw new Error("Unauthorized requests");

    // dump the body to storage
    const mailgunStorage = new MailGunStorageService("firebase");
    await mailgunStorage.save(body);

    // send sms notification
    const notification = new NotificationService("aws");
    const payload = {
      Provider: "Mailgun",
      timestamp: eventBody.timestamp,
      type: `email ${eventBody.event}`,
    };

    notification.send(JSON.stringify(payload), {
      topic: process.env.AWS_SNS_TOPIC || "",
    });
    return formatResponse(serialize(body));
  } catch (error) {
    return formatError(error);
  }
};
