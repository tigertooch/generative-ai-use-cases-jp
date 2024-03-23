#!/bin/bash

set -eu

STACK_NAME='GenerativeAiUseCasesStack'

function stack_output {
    aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" \
        --output text
}

echo 'Setup environment variables...'

export VITE_APP_API_ENDPOINT=`stack_output 'ApiEndpoint'`
echo $VITE_APP_API_ENDPOINT
export VITE_APP_REGION=`stack_output 'Region'`
echo $VITE_APP_REGION
export VITE_APP_USER_POOL_ID=`stack_output 'UserPoolId'`
echo $VITE_APP_USER_POOL_ID
export VITE_APP_USER_POOL_CLIENT_ID=`stack_output 'UserPoolClientId'`
echo $VITE_APP_USER_POOL_CLIENT_ID
export VITE_APP_IDENTITY_POOL_ID=`stack_output 'IdPoolId'`
echo $VITE_APP_IDENTITY_POOL_ID
export VITE_APP_PREDICT_STREAM_FUNCTION_ARN=`stack_output PredictStreamFunctionArn`
echo $VITE_APP_PREDICT_STREAM_FUNCTION_ARN
export VITE_APP_RAG_ENABLED=`stack_output RagEnabled`
echo $VITE_APP_RAG_ENABLED
export VITE_APP_AGENT_ENABLED=`stack_output AgentEnabled`
echo $VITE_APP_AGENT_ENABLED
export VITE_APP_SELF_SIGN_UP_ENABLED=`stack_output SelfSignUpEnabled`
echo $VITE_APP_SELF_SIGN_UP_ENABLED
export VITE_APP_MODEL_REGION=`stack_output ModelRegion`
echo $VITE_APP_MODEL_REGION
export VITE_APP_MODEL_IDS=`stack_output ModelIds`
echo $VITE_APP_MODEL_IDS
export VITE_APP_IMAGE_MODEL_IDS=`stack_output ImageGenerateModelIds`
echo $VITE_APP_IMAGE_MODEL_IDS
export VITE_APP_ENDPOINT_NAMES=`stack_output EndpointNames`
echo $VITE_APP_ENDPOINT_NAMES
export VITE_APP_SAMLAUTH_ENABLED=`stack_output SamlAuthEnabled`
echo $VITE_APP_SAMLAUTH_ENABLED
export VITE_APP_SAML_COGNITO_DOMAIN_NAME=`stack_output SamlCognitoDomainName`
echo $VITE_APP_SAML_COGNITO_DOMAIN_NAME
export VITE_APP_SAML_COGNITO_FEDERATED_IDENTITY_PROVIDER_NAME=`stack_output SamlCognitoFederatedIdentityProviderName`
echo $VITE_APP_SAML_COGNITO_FEDERATED_IDENTITY_PROVIDER_NAME
export VITE_APP_AGENT_NAMES=`stack_output AgentNames`
echo $VITE_APP_AGENT_NAMES
export VITE_APP_RECOGNIZE_FILE_ENABLED=`stack_output RecognizeFileEnabled`
echo $VITE_APP_RECOGNIZE_FILE_ENABLED

