import { AdminChatController } from '@controllers/AdminChatController'
import { AuthController } from '@controllers/AuthController'
import { ChatController } from '@controllers/ChatController'
import { DeviceController } from '@controllers/DeviceController'
import { FileController } from '@controllers/FileController'
import { IndexController } from '@controllers/IndexController'
import { PostController } from '@controllers/PostController'
import { UserController } from '@controllers/UserController'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ChatQueueRepository } from '@repositories/ChatQueueRepository'
import { ChatRepository } from '@repositories/ChatRepository'
import { DeviceRepository } from '@repositories/DeviceRepository'
import { MessageOrderSequenceRepository } from '@repositories/MessageOrderSequenceRepository'
import { MessageRepository } from '@repositories/MessageRepository'
import { PostOrderSequenceRepository } from '@repositories/PostOrderSequenceRepository'
import { PostRepository } from '@repositories/PostRepository'
import { UserRepository } from '@repositories/UserRepository'
import { AppleStrategy } from '@services/AppleStrategy'
import { AuthService } from '@services/AuthService'
import { ChatService } from '@services/ChatService'
import { ConfigService } from '@services/ConfigService'
import { DeviceService } from '@services/DeviceService'
import { EmailStrategy } from '@services/EmailStrategy'
import { GoogleStrategy } from '@services/GoogleStrategy'
import { IndexService } from '@services/IndexService'
import { JwtStrategy } from '@services/JWTStrategy'
import { PostService } from '@services/PostService'
import { S3Service } from '@services/S3Service'
import { UserService } from '@services/UserService'
import { Chat, ChatQueue, Device, Image, Like, Message, MessageOrderSequence
  ,Notification, NotificationOrderSequence, Post, PostMapping
, PostOrderSequence, Unlike, User, Verification } from '@sogdagim/orm'
import connectionOptions from '@sogdagim/orm/ormConfig'
import 'module-alias/register'
import path from 'path'
import { ChatGateway } from './gateways/ChatGateway'
import { jwtConstants } from './Constants'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: jwtConstants.secret
			// signOptions: { expiresIn: '60s' }
		}),
		MulterModule.registerAsync({
			useClass: S3Service
		}),
		TypeOrmModule.forFeature([
		Chat, Device, Image, Like, Message, MessageOrderSequence
		,Notification, NotificationOrderSequence, Post, PostMapping
		, PostOrderSequence, Unlike, User, Verification, ChatQueue,
		UserRepository, PostRepository, PostOrderSequenceRepository,
		DeviceRepository, ChatRepository, MessageRepository, ChatQueueRepository,
		MessageOrderSequenceRepository
		])
	],
	controllers: [
		IndexController, UserController, AuthController, PostController, DeviceController,
		ChatController, AdminChatController, FileController
	],
	providers: [
	IndexService, UserService, AuthService, EmailStrategy, JwtStrategy, PostService, GoogleStrategy,
	ChatGateway, DeviceService, ChatService, AppleStrategy, ConfigService, S3Service
	]

})
class AllModule {
}

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...connectionOptions as TypeOrmModuleOptions
			, entities: [path.resolve('node_modules/@sogdagim/orm/dist/entities/*.js')]
			, subscribers: [path.resolve('node_modules/@sogdagim/orm/dist/subscribers/*.js')]
		}),
		AllModule
	]
})
export class AppModule {}
