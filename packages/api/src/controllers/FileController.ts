import { ClassSerializerInterceptor, Controller, Post, SerializeOptions, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class FileController {

	@Post('/files')
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFiles(@UploadedFiles() files: Express.MulterS3.File[]): Promise<string[]> {
		// [
		// 	{
		// 	  fieldname: 'files',
		// 	  originalname: 'KakaoTalk_Photo_2020-07-01-22-30-42.jpeg',
		// 	  encoding: '7bit',
		// 	  mimetype: 'image/jpeg',
		// 	  size: 2424404,
		// 	  bucket: 'sogdagim',
		// 	  key: '1600040304289-KakaoTalk_Photo_2020-07-01-22-30-42.jpeg',
		// 	  acl: 'public-read',
		// 	  contentType: 'application/octet-stream',
		// 	  contentDisposition: null,
		// 	  storageClass: 'STANDARD',
		// 	  serverSideEncryption: null,
		// 	  metadata: { fieldName: 'files' },
		// 	  location: 'https://sogdagim.s3.amazonaws.com/1600040304289-KakaoTalk_Photo_2020-07-01-22-30-42.jpeg',
		// 	  etag: '"4a22c212805efeefba346edcd251e23f"',
		// 	  versionId: undefined
		// 	}
		// ]
		return files.map((file) => file.key)
	}
}
