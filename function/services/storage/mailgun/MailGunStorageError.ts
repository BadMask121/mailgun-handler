// TODO: sanitize error messages to be consistent for all mailgun db service
export class MailGunServiceError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
