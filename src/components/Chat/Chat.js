import React from 'react'
import { withRouter } from 'react-router-dom'

import './chat.css'
import useChat from './useChat'

// followed these tutorials for setup
// https://www.valentinog.com/blog/socket-react/
// https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
const Chat = props => {
  const [message, setMessage] = React.useState('')
  const { messages, sendMessage } = useChat()
  const username = props.user.username

  const handleNewMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(message, username)
    setMessage("")
  }

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
            >
              {message.ownedByCurrentUser ? `${message.body}` : `${message.owner}: ${message.body}`}
            </li>
          ))}
        </ol>
      </div>
      <div className="d-flex flex-row">
      <textarea
        value={message}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field col-8"
      />
      <button onClick={handleSendMessage} className="send-message-button col-4">
        Send
      </button>
    </div>
    </div>
  )
}

export default withRouter(Chat)
