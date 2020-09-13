import { Injectable } from '@nestjs/common'
import dotenv from 'dotenv'
import fs from 'fs'

@Injectable()
export class ConfigService {
	readonly envConfig: { [key: string]: string }

	constructor() {
		const filePath = `.env${process.env.NODE_ENV === 'local' ? '' : process.env.NODE_ENV }`
		this.envConfig = dotenv.parse(fs.readFileSync(filePath))
	}

	getAny(key: string) {
		return this.envConfig[key]
	}

	getString(key: string) {
		return this.envConfig[key]
	}

	getNumber(key: string) {
		return Number(this.envConfig[key])
	}

	getBoolean(key: string) {
		return Boolean(this.envConfig[key])
	}

}
