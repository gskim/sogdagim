import { Inject, Injectable, Logger } from '@nestjs/common'
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
import AWS from 'aws-sdk'
import MulterS3 from 'multer-s3'
import { ConfigService } from './ConfigService'

@Injectable()
export class S3Service implements MulterOptionsFactory {

	private readonly s3: AWS.S3
	private readonly FILE_LIMIT_SIZE = 9437184 // 9mb

	constructor() {
		this.s3 = new AWS.S3()
	}

	async getObject(key: string) {
		try {
			const result = await this.s3.getObject({ Bucket: 'sogdagim-keys', Key: key }).promise()
			if (result.Body) {
				return result.Body.toString()
			} else {
				return undefined
			}
		} catch (error) {
			console.log(error)
			return undefined
		}
	}

	createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
		const bucket = `sogdagim`
		const acl = 'public-read'
		const multerS3Storage = MulterS3({
			s3: this.s3,
			bucket: bucket,
			acl: acl,
			metadata: (req, file, cb) => {
				cb(null, { fieldName: file.fieldname })
			},
			key: (req, file, cb) => {
				cb(null, `${Date.now().toString()}-${file.originalname}`)
			}
		})
		return {
			storage: multerS3Storage,
			fileFilter: this.fileFilter,
			limits: {
				fileSize: this.FILE_LIMIT_SIZE
			}
		}
	}

	fileFilter(req: Express.Request, file: Express.Multer.File, cb: (error: Error| null, acceptFile: boolean) => void) {
		if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
			cb(null, true)
		} else {
			Logger.log(`No! ${JSON.stringify(file)}`)
			cb(new Error('unsupported file'), false)
		}
	}

}
