import crypto from 'crypto'
import cryptoJS from 'crypto-js'

export default class Crypto {

	static genToken = () => {
		return crypto.randomBytes(20).toString('hex')
	}

	static SHA256 = (data: string) => {
		const wordArray = cryptoJS.SHA256(data)
		return cryptoJS.enc.Hex.stringify(wordArray)
	}

	static isMatchedPassword = (hashedPassword: string | null | undefined, providedPassword: string) => {
		return hashedPassword === Crypto.SHA256(providedPassword)
	}
}