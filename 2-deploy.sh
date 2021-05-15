#!/bin/bash
set -eo pipefail
ARTIFACT_BUCKET=$(cat bucket-name.txt)
FUNCTION=$(aws cloudformation describe-stack-resource --stack-name receeve --logical-resource-id function --query 'StackResourceDetail.PhysicalResourceId' --output text)
aws lambda update-function-configuration --function-name $FUNCTION --environment "Variables={MAILGUN_SIGNING_KEY=ffddc2cec4657c3c2b8136acb9def32b-602cc1bf-f69c4a34,AWS_SNS_TOPIC=arn:aws:sns:us-east-2:419287194037:EmailEvent}"
aws cloudformation package --template-file template.yml --s3-bucket $ARTIFACT_BUCKET --output-template-file out.yml
aws cloudformation deploy --template-file out.yml --stack-name receeve --capabilities CAPABILITY_NAMED_IAM
