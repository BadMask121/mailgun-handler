import MailgunHandler from "./Mailgun.handler";
const fs = require("fs");
const AWSXRay = require("aws-xray-sdk-core");
AWSXRay.setContextMissingStrategy("LOG_ERROR");

test("Runs function handler expect to pass", async () => {
  let eventFile = fs.readFileSync("event.json");
  let event = JSON.parse(eventFile);
  let response = await MailgunHandler(event, null);
  expect(response.statusCode).toBe(200);
});

test("Runs function handler to throw error", async () => {
  let eventFile = fs.readFileSync("event-v2.json");
  let event = JSON.parse(eventFile);
  let response = await MailgunHandler(event, null);
  expect(response.statusCode).not.toBe(200);
});
