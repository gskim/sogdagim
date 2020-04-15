import { NextPage } from 'next'

export type PageComponent<P = {}, IP = {}> = NextPage<P, IP> & {}
