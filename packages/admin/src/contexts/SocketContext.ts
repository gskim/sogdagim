import React from 'react'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(process.env.API_HOST || 'localhost')

export const SocketContext = React.createContext(socket)
