import * as React from 'react'

interface AuthContextProps {
	signIn: (data: {email: string, password: string}) => Promise<void>
	signOut: (data: any) => Promise<void>
	signUp: (data: any) => Promise<void>
}

export const AuthContext = React.createContext({} as AuthContextProps)
