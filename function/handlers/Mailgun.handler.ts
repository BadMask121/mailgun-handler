import {
  formatError,
  formatResponse,
  serialize,
  verifyMailgunRequest,
} from '../helpers';
import { MailGunStorageService } from '../services/storage';
import { NotificationService } from '../services/sns/index';
import { AwsProvider } from '../services/sns/aws/index';
import { FirebaseProvider } from '../services/storage/mailgun/firebase/index';

export default async (event: any, context: any) => {
  try {
    const body =
      typeof event.body !== 'object' ? JSON.parse(event.body) : event.body;

    const signature = {
      signature: body.signature.signature,
      token: body.signature.token,
      timestamp: body.signature.timestamp,
    };

    const eventBody = body['event-data'];

    const isValidRequest = verifyMailgunRequest({
      ...signature,
      signingKey: process.env.MAILGUN_SIGNING_KEY as string,
    });

    if (!isValidRequest) throw new Error('Unauthorized requests');

    // dump the body to storage
    const mailgunStorage = new MailGunStorageService(new FirebaseProvider());
    await mailgunStorage.save(body);

    if (process.env.AWS_SNS_TOPIC) {
      // send sms notification
      const notification = new NotificationService(new AwsProvider());
      const payload = {
        Provider: 'Mailgun',
        timestamp: eventBody.timestamp,
        type: `email ${eventBody.event}`,
      };

      notification.send(JSON.stringify(payload), {
        topic: process.env.AWS_SNS_TOPIC || '',
      });
    }
    return formatResponse(serialize(body));
  } catch (error) {
    return formatError(error);
  }
};
