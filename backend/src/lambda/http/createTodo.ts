import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../usecases/todosUsecases';

const logger = createLogger('createTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    event
  })
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userId = "123456" // TODO get from authenticated user

  const newItem = await createTodo(newTodo, userId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        newItem
    })
  }
}
