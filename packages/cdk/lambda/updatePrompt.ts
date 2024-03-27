import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdatePromptRequest } from 'generative-ai-use-cases-jp';
import { updatePrompt } from './repository';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters!.id!;
    const userId: string =
      event.requestContext.authorizer!.claims['cognito:username'];
    const req: UpdatePromptRequest = JSON.parse(event.body!);

    const prompt = await updatePrompt(userId,id, req.content);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ prompt }),
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
