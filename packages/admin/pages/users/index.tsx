import { CommonUser } from '@sogdagim/model/models/app'
import { PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { NextPageContext } from 'next'
import React from 'react'

const userFetcher = new UserFetcher()

const Users: PageComponent<{users: CommonUser[]}> = ({ users }) => {
	return (
		<>
		<ul>
			{users.map((user: CommonUser) => (
				<li>{JSON.stringify(user)}</li>
			))}
		</ul>
		</>
	)
}

Users.getInitialProps = async (context: NextPageContext) => {
	userFetcher.setContext(context)
	const users: CommonUser[] = await userFetcher.getUsers()
	return { users }
}

// export async function getServerSideProps() {
// 	const users: CommonUser[] = await userFetcher.getUsers()
// 	return {
// 		props: {
// 			users
// 		}
// 	}
// }

export default Users
