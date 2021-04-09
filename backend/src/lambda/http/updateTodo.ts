import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo } from '../../usecases/todosUsecases';

const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    event
  })
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  await updateTodo(todoId, updatedTodo)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ""
  }
}
