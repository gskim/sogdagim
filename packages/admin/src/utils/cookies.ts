import { serialize } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

interface Options {
	expires?: Date
	maxAge?: number
	path?: string
}

export const setCookie = (
	res: NextApiResponse,
	name: string,
	value: unknown,
	options: Options = {}
) => {
  const stringValue =
	typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

	if (options.maxAge) {
		options.expires = new Date(Date.now() + options.maxAge)
		options.maxAge /= 1000
	}
	options.path = '/'
	res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}
