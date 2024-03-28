import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdatePromptRequest } from 'generative-ai-use-cases-jp';
import { deletePrompt } from './repository';
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId: string =event.requestContext.authorizer!.claims['cognito:username'];
    const req: UpdatePromptRequest = JSON.parse(event.body!);
    await deletePrompt(userId,req.uuid,req.createdDate);
    return {
      statusCode: 204,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: '',
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
