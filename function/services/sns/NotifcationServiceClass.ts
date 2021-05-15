import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export type NotificationProvider = "aws" | "twilio";
export type NotificationOptions<T> = T & { topic: string };
export abstract class NotificationServiceClass {
  abstract send<U>(
    message: string,
    options?: NotificationOptions<U | AWS.SNS.PublishInput>
  ): Promise<void | PromiseResult<AWS.SNS.PublishResponse, AWS.AWSError>>;
}
