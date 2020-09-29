const {SnakeNamingStrategy} = require('typeorm-naming-strategies')
const snake = new SnakeNamingStrategy()
module.exports = {
    "logging": true,
    "type": "mysql",
    "host": process.env.DB_ENDPOINT,
    "port": 3306,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
	"database": process.env.DB_SCHEMA,
    "entities": ["./dist/entities/*.js"],
    "migrations": ["./dist/migrations/*.js"],
    "timezone": process.env.TZ,
    "charset": 'utf8mb4_unicode_ci',
    "namingStrategy": snake,
	"dateStrings": ['DATE'],
    "cli": {
        "migrationsDir": "./src/migrations"
    }
}