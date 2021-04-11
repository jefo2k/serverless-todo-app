import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { parseJwtToken, parseUserId } from '../../auth/utils'
import { uploadTodoFile } from '../../usecases/todosUsecases'
import { S3SignedUrlGenerator } from '../../s3/S3SignedUrlGenerator'

const bucketName = process.env.IMAGES_S3_BUCKET

const logger = createLogger('generateUploadUrl')
const s3SignedUrlGenerator = new S3SignedUrlGenerator()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', { event })

  const authHeader = event.headers.Authorization
  const jwtToken = parseJwtToken(authHeader)
  const userId = parseUserId(jwtToken)
  const todoId = event.pathParameters.todoId

  // get the upload url directly with the s3SignedUrlGenerator
  // the attachment upload method must not be a concern of the use cases layer
  const attachmentId = `${todoId}|${new Date().getTime()}`
  const attachemtUploadUrl = await s3SignedUrlGenerator.getUrl(attachmentId)

  // define atachment url and update the Todo via use case layer
  const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${attachmentId}`
  await uploadTodoFile(userId, todoId, attachmentUrl)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: attachemtUploadUrl
    })
  }
}
