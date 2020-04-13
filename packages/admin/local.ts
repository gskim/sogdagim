import * as dotenv from 'dotenv'
dotenv.config()
import app from './server'

const port = parseInt(`${process.env.PORT}`, 10) || 3000

app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`> Ready on http://localhost:${port}`)
})
