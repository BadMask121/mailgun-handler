export type NotificationProvider = "aws" | "twilio";
export type NotificationOptions<T> = T & { topic: string };
