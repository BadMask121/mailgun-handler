import AWS from "aws-sdk";
import crypto from "crypto";

export const lambda = new AWS.Lambda();

export const formatResponse = function (body: any, customHeaders?: string[]) {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    multiValueHeaders: {
      "X-Custom-Header": customHeaders,
    },
    body: body || null,
  };
  return response;
};

export const formatError = function (error: AWS.AWSError) {
  const response = {
    statusCode: error.statusCode || 400,
    headers: {
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code,
    },
    isBase64Encoded: false,
    body: error.code + ": " + error.message,
  };
  return response;
};
// Use SDK client
export const getAccountSettings = function () {
  return lambda.getAccountSettings().promise();
};

export const serialize = function (object: any) {
  return JSON.stringify(object, null, 2);
};

/**
 *
 * @param param0
 * @returns
 */
export type VerifyMailgunRequestType = {
  signingKey: string;
  timestamp: string;
  token: string;
  signature: string;
};
// TODO: check if timestamp is not too far from currenttime
export const verifyMailgunRequest = ({
  signingKey,
  timestamp,
  token,
  signature,
}: VerifyMailgunRequestType) => {
  const encodedToken = crypto
    .createHmac("sha256", signingKey)
    .update(timestamp.concat(token))
    .digest("hex");

  return encodedToken === signature;
};
