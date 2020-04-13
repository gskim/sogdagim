import { CommonUser } from '@sogdagim/model/models'
import { NextPage } from 'next'
import fetch from 'node-fetch'
import React from 'react'

interface UsersProps {
	users: CommonUser[]
}

const Users: NextPage<UsersProps> = ({ users }) => {

	return (
		<ul>
			{users.map((user: CommonUser) => (
				<li>{user.nickname}</li>
			))}
		</ul>
	)
}

// Users.getInitialProps = async () => {
// 	const res = await fetch('http://localhost/users')
// 	const users = await res.json()
// 	return {
// 		users
// 	}
// }

export async function getStaticProps() {
	const res = await fetch('http://localhost/users')
	const users = await res.json()
	return {
		props: {
			users
		}
	}
}

export default Users
