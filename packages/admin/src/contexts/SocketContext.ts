import React from 'react'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('localhost')

export const SocketContext = React.createContext(socket)
