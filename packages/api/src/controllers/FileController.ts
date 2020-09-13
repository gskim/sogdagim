import { ClassSerializerInterceptor, Controller, Post, SerializeOptions, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class FileController {

	@Post('/files')
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFiles(@UploadedFiles() files: Express.MulterS3.File[]): Promise<string[]> {
		return files.map((file) => file.key)
	}
}
