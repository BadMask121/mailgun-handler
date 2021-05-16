# mailgun-handler
This function sends Simple notification message to customers on mailgun email events via lambda proxy and mailgun webhook integration.
## GET STARTED
run `yarn` to install dependencies

For saving the mailgun event dump we use firebase and you must update your service key in
    `/function/services/storage/mailgun/firebase/receeve-service-account.json`

To add other storage services add your code to
    `function/services/storage/mailgun/`
    
and then create a attach your provider which should inherit the `MailGunStorageClass` abstract   class to the `MailGunStorageService` code in 
    `function/services/storage/mailgun/index.ts` file

## Deployment
Make sure to run test script with `yarn test` and make sure all test passed before deployment

to deploy run `yarn deploy`

### Environment setup

Before deployment make sure to setup the necessary environment variables in the ./2-deploy.sh file


MAILGUN_SIGNING_KEY=
AWS_SNS_TOPIC=

Now once deployed make sure to setup proxy integration to from aws api gateway and integrate with the lambda function, by default an api gateway is created which might not be a proxy api.

you can set up a proxy api gateway with this link 
https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

if theres a much simplier way to create and integrate the proxy gateway with the lambda function please notify me 
thank you.