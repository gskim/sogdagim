import * as dotenv from 'dotenv'
import 'module-alias/register'
import 'reflect-metadata'
dotenv.config()
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked'
import { RedisIoAdapter } from './adapters/RedisIoAdapter'
import { AppModule } from './AppModule'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.disable('x-powered-by')

async function bootstrap() {
  initializeTransactionalContext()
	patchTypeORMRepositoryWithBaseRepository()
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app))
  nestApp.useWebSocketAdapter(new RedisIoAdapter(nestApp))
  nestApp.enableCors()
  nestApp.useGlobalPipes(new ValidationPipe({
	transform: true,
  disableErrorMessages: process.env.DEBUG !== 'true'
  }))

  await nestApp.init()
  await nestApp.listen(80)
}
bootstrap()
