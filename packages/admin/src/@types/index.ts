import { CommonUser } from '@sogdagim/model/models/app'
import { NextPage } from 'next'

export type PageComponent<P = {}, IP = {}> = NextPage<P, IP> & {
	myInfo?: CommonUser | {}
}
