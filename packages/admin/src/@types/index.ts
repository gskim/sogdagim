import { SimpleUser } from '@sogdagim/model/models'
import { NextPage } from 'next'
import { AppContext as NextAppContext } from 'next/app'
export type PageComponent<P = {}, IP = {}> = NextPage<P, IP> & {
	myInfo?: SimpleUser | {}
	layoutType: LayoutType
	isPublicPage?: boolean
}

export type AppContext = NextAppContext & {
	Component: PageComponent
}

export enum LayoutType {
	전체화면,
	기본화면
}

export interface LayoutOptions {
	layoutType: LayoutType
	path: string
	logout: () => void
}
