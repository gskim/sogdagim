import Link from 'next/link'

const Error = ({ message }) => {
	return (
		<>
			<p>{ message }</p>
			<Link href='/'><a>메인화면으로 가기</a></Link>
		</>
	)
}

Error.getInitialProps = (context) => {
	const { message } = context.query
	return { message }
}

Error.isPublicPage = true

export default Error
