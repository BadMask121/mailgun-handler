import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export type NotificationProvider = "aws" | "twilio";
export type NotificationOptions<T> = T & { topic?: string };
export abstract class NotificationServiceClass {
  abstract send<U, T = {}>(
    message: string,
    options?: NotificationOptions<U | Omit<AWS.SNS.PublishInput, "Message">>
  ):
    | Promise<T | any>
    | Promise<T | PromiseResult<AWS.SNS.PublishResponse, AWS.AWSError>>;
}
