import React from 'react'
import "./ChatMessage.css";

const ChatMessage = props => {
  return (
    <p className={`chat__message ${props.isClient ? "chat__message--client" : "chat__message--receipent"}`}>
    <span className='chat__name'>{props.chatName}</span>
    {props.message}
    <span className='chat__timeStamp'>{props.time}</span>
</p>
  )
}

export default ChatMessage