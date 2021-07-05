import { NotificationService } from '.';

test('Run Sns notification service for aws', async () => {
  const notification = new NotificationService(new MockSNS());

  const result = await notification.send('hello world', {
    topic: 'arn:aws:sns:us-east-2:419287194037:EmailEvent',
  });
  expect(result).toHaveProperty('MessageId');
  expect(result).not.toBeNull();
  expect(result).not.toBeUndefined();
});
