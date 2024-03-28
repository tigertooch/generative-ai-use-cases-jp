import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdatePromptRequest } from 'generative-ai-use-cases-jp';
import { updatePrompt } from './repository';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userId: string =event.requestContext.authorizer!.claims['cognito:username'];
    const req: UpdatePromptRequest = JSON.parse(event.body!);
  try {
    
    const prompt = await updatePrompt(userId,req.uuid,req.createdDate, req.content);
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
    const simplifiedEvent = {
      path: event.path,
      httpMethod: event.httpMethod,
      body: event.body, 
    };
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: { message: 'Internal Server Error'}|| 'Unknown error', 
        userId: userId, // 返回userId
        event: simplifiedEvent, // 返回简化后的event信息
      }),
    };
  }
};
