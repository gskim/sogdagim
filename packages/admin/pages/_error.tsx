import { NextPageContext } from 'next'
import { ErrorProps } from 'next/error'
import React from 'react'
const Error = ({ statusCode }: ErrorProps) => {
	return (
	  <p>
		{statusCode
		  ? `An error ${statusCode} occurred on server`
		  : 'An error occurred on client'}
	  </p>
	)
  }

  Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
  }

  export default Error
