import * as React from 'react'

interface AuthContextProps {
	apple: () => Promise<void>
	google: () => Promise<void>
	signIn: (data: {email: string, password: string}) => Promise<void>
	signOut: (data: any) => Promise<void>
}

export const AuthContext = React.createContext({} as AuthContextProps)
