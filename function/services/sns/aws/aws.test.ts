import { PromiseResult } from "aws-sdk/lib/request";
import { AwsProvider } from ".";
test("Run Aws sns service test", async () => {
  const sns = new AwsProvider();

  const result = (await sns.send("hello world", {
    topic: "arn:aws:sns:us-east-2:419287194037:EmailEvent",
  })) as PromiseResult<AWS.SNS.PublishResponse, AWS.AWSError>;
  expect(result).toHaveProperty("MessageId");
  expect(result).not.toBeNull();
  expect(result).not.toBeUndefined();
});
