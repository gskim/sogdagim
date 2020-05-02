import { AuthController } from '@controllers/AuthController'
import { IndexController } from '@controllers/IndexController'
import { UserController } from '@controllers/UserController'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { AuthService } from '@services/AuthService'
import { EmailStrategy } from '@services/EmailStrategy'
import { IndexService } from '@services/IndexService'
import { JwtStrategy } from '@services/JWTStrategy'
import { UserService } from '@services/UserService'
import { Chat, Device, Image, Like, Message, MessageOrderSequence
  ,Notification, NotificationOrderSequence, Post, PostMapping
, PostOrderSequence, Unlike, User, Verification } from '@sogdagim/orm'
import connectionOptions from '@sogdagim/orm/ormConfig'
import 'module-alias/register'
import path from 'path'
import { jwtConstants } from './Constants'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: jwtConstants.secret
			// signOptions: { expiresIn: '60s' }
		}),
		TypeOrmModule.forFeature([
		Chat, Device, Image, Like, Message, MessageOrderSequence
		,Notification, NotificationOrderSequence, Post, PostMapping
		, PostOrderSequence, Unlike, User, Verification,
		UserRepository
		])
	],
	controllers: [
		IndexController, UserController, AuthController
	],
	providers: [
	IndexService, UserService, AuthService, EmailStrategy, JwtStrategy
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
