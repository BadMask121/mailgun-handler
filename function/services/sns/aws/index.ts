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
    this.sns = new AWS.SNS();
  }

  async send(
    message: string,
    options: NotificationOptions<AWS.SNS.PublishInput>
  ) {
    var params = {
      Message: message /* required */,
      TopicArn: options.topic,
    };

    const publish = this.sns
      .publish(params)
      .promise()
      .catch(function (err) {
        console.error(err, err.stack);
      });

    return publish;
  }
}
