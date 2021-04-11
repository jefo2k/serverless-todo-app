import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('S3SignedUrlGenerator')

export class S3SignedUrlGenerator {

  constructor(
    private readonly s3: AWS.S3 = new XAWS.S3({signatureVersion: 'v4'}),
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly urlExpiration: Number = Number(process.env.SIGNED_URL_EXPIRATION)
    ) {}

  async getUrl(attachmentId: string): Promise<string> {
    logger.info('Generating S3 signed url')
    
    const s3SignedUrl = this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: attachmentId,
      Expires: this.urlExpiration
    })

    logger.info('S3 signed url generated', { s3SignedUrl })
    logger.info('S3 signed url expiration time ', this.urlExpiration )

    return s3SignedUrl
  }
}