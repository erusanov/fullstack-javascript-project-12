import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { SocketContext } from '../context'

import {
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
} from '../slice'

const SocketProvider = ({ children }) => {
  const socket = io()
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload))
    })

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload))
    })

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id))
    })

    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } }))
    })

    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removeChannel')
      socket.off('renameChannel')
    }
  }, [dispatch, socket])

  const socketApi = useMemo(() => ({
    sendMessage: (message, callback) => {
      socket.emit('newMessage', message, callback)
    },
    createChannel: (channel, callback) => {
      socket.emit('newChannel', channel, callback)
    },
    renameChannel: (channel, callback) => {
      socket.emit('renameChannel', channel, callback)
    },
    removeChannel: (id, callback) => {
      socket.emit('removeChannel', { id }, callback)
    },
  }), [socket])

  return (
    <SocketContext.Provider value={socketApi}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
