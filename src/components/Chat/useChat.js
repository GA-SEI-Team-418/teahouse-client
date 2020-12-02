// The contents of this file was built from this website
// https://github.com/pixochi/socket.io-react-hooks-chat/blob/master/client/src/useChat.js
import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

import apiUrl from '../../apiConfig'
const SERVER_URL = apiUrl

const useChat = () => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = socketIOClient(SERVER_URL)

    socketRef.current.on('chat message', msg => {
      const incomingMessage = {
        ...msg,
        ownedByCurrentUser: msg.senderId === socketRef.current.id,
      }
      setMessages(messages => [...messages, incomingMessage])
    })

    return () => {socketRef.current.disconnect()}
  }, [])

  const sendMessage = (msg, username) => {
    socketRef.current.emit('chat message', {
      body: msg,
      owner: username,
      senderId: socketRef.current.id
    })
  }

  return { messages, sendMessage }
}

export default useChat