import { setCookie } from '@src/utils/cookies'
import Axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const result = await Axios.post(`${process.env.API_HOST}/auths/apple`, { code: req.body.code, id_token: req.body.id_token })
		const accessToken = result.data.accessToken
		setCookie(res, 'token', accessToken)
		res.redirect(301, '/')
	} else {
		res.status(200).json({ result: 'ok' })
	}

}
