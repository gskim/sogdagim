import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const connectionOptions: MysqlConnectionOptions = {
	type: 'mysql',
	logging: process.env.DB_LOG === 'true',
	entities: [__dirname + '/entities/**/*.ts', __dirname + '/entities/**/*.js'],
	migrations: [__dirname + '/migrations/*.ts', __dirname + '/migrations/*.js'],
	database: process.env.DB_SCHEMA,
	namingStrategy: new SnakeNamingStrategy(),
	charset: 'utf8mb4',
	dateStrings: ['DATE'],
	host: process.env.DB_ENDPOINT,
	port: 3306,
	timezone: process.env.TZ,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
}

export default connectionOptions
