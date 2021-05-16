import AWS from "aws-sdk";

import { lambda } from "../../../helpers";
import {
  NotificationOptions,
  NotificationServiceClass,
} from "../NotifcationServiceClass";

export class AwsProvider extends NotificationServiceClass {
  protected sns: AWS.SNS;
  constructor() {
    super();

    // Set region
    lambda.config.update({ region: process.env.AWS_REGION });
    this.sns = new AWS.SNS({ region: process.env.AWS_REGION });
  }

  /**
   * Sends messages through aws sns service and @returns a response
   * @param message
   * @param options
   * @returns
   */
  async send(
    message: string,
    options?: NotificationOptions<Omit<AWS.SNS.PublishInput, "Message">>
  ) {
    const params = {
      Message: message /* required */,
      TopicArn: options?.topic,
      ...options,
    };
    // deleting generic topic object to prevent aws throughing error as this property isnt supported
    // in future i'll find a better way to handle this
    Reflect.deleteProperty(params, "topic");

    const publish = this.sns
      .publish(params)
      .promise()
      .catch(function (err) {
        console.error(err, err.stack);
      });

    return publish;
  }
}
