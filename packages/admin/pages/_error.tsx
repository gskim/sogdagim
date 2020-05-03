import { Button, Result } from 'antd'
import { NextPageContext } from 'next'
import Link from 'next/link'

const Error = ({ message }) => {
	return (
		<>
			<Result
				status='404'
				title='404'
				subTitle='Sorry, the page you visited does not exist.'
				extra={<Link href='/'><Button type='primary'>Back Home</Button></Link>}
			/>
		</>
	)
}

Error.getInitialProps = (context: NextPageContext) => {
	const { message } = context.query
	return { message }
}

Error.isPublicPage = true

export default Error
