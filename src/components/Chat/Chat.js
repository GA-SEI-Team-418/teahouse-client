import React, { useState, useEffect, Fragment } from 'react'
import socketIoClient from 'socket.io-client'
import { withRouter } from 'react-router-dom'

import apiUrl from '../../apiConfig'
const ENDPOINT = apiUrl

// followed tutorial on this site for initial setup
// https://www.valentinog.com/blog/socket-react/
const Chat = props => {
  const [response, setResponse] = useState('')

  useEffect(() => {
    const socket = socketIoClient(ENDPOINT)
    socket.on("FromAPI", data => {
      setResponse(data)
    })

    return () => socket.disconnect()
  }, [])

  return (
    <Fragment>
      <p>It's <time dateTime={response}>{response}</time></p>
      <ul id='messages'></ul>
      <form>
        <input type='text' autoComplete='off'/>
        <button type='submit'>Send</button>
      </form>
    </Fragment>
  )
}

export default withRouter(Chat)
