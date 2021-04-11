import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../usecases/todosUsecases'
import { parseJwtToken, parseUserId } from '../../auth/utils'

const logger = createLogger('createTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', { event })

  const authHeader = event.headers.Authorization
  const jwtToken = parseJwtToken(authHeader)
  const userId = parseUserId(jwtToken)
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  try {
    const newItem = await createTodo(newTodo, userId)
  
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: newItem
      })
    }
  } catch (error) {
    logger.error('Error creating Todo', { error })
    throw new Error(error)
  }
}
