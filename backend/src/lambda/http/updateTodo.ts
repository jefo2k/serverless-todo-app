import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo } from '../../usecases/todosUsecases'
import { createLogger } from '../../utils/logger'
import { parseJwtToken, parseUserId } from '../../auth/utils'

const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', { event })
  
  const authHeader = event.headers.Authorization
  const jwtToken = parseJwtToken(authHeader)
  const userId = parseUserId(jwtToken)
  const todoId = event.pathParameters.todoId

  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  await updateTodo(userId, todoId, updatedTodo)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
