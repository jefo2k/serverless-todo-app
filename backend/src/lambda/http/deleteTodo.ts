import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodo } from '../../usecases/todosUsecases'
import { createLogger } from '../../utils/logger'
import { parseJwtToken, parseUserId } from '../../auth/utils'

const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', { event })
  
  const authHeader = event.headers.Authorization
  const jwtToken = parseJwtToken(authHeader)
  const userId = parseUserId(jwtToken)
  const todoId = event.pathParameters.todoId

  try {
    await deleteTodo(userId, todoId)
  
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': true
      },
      body: ''
    }
  } catch (error) {
    logger.error('Error removing Todo', { error })
    throw new Error(error)
  }

}
