import * as dotenv from 'dotenv'
import 'module-alias/register'
import 'reflect-metadata'
dotenv.config()
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import { AppModule } from './AppModule'

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.disable('x-powered-by')

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app))
  nestApp.useGlobalPipes(new ValidationPipe({
		transform: true,
		disableErrorMessages: process.env.DEBUG !== 'true'
  }))
  await nestApp.init()
  await nestApp.listen(80)
}
bootstrap()
