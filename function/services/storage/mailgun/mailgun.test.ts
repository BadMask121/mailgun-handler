import { MailGunStorageService } from ".";
import { MailGunBody } from "./MailGunStorageClass";

/**
 * this test suites tests every storage instance for saving the mailgun event object
 */
test("Run Mailgun save service for firebase", async () => {
  const mailgun = new MailGunStorageService("firebase");
  const content: MailGunBody = {
    signature: {
      signature: "randomsignature",
      timestamp: Date.now(),
      token: "randomtoken",
    },
    "event-data": {
      event: "opened",
      id: "randomid",
      timestamp: Date.now(),
    },
  };

  expect(content).toMatchObject({
    signature: {
      signature: expect.any(String),
      timestamp: expect.any(Number),
      token: expect.any(String),
    },
    "event-data": {
      event: expect.stringMatching(/opened|clicked/),
      id: expect.any(String),
      timestamp: expect.any(Number),
    },
  });

  const saveId = await mailgun.save(content);
  expect(saveId).not.toBeNull();
});
