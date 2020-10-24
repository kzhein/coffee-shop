import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import Messages from './Messages';
import Input from './Input';
import './LiveChat.css';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [showLiveChat, setShowLiveChat] = useState(false);
  let [arrivedMessage, setArrivedMessage] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(openSocket('/'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', data => {
        setArrivedMessage(data);
      });

      socket.on('connectedUsers', users => setConnectedUsers(users));
    }

    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  useEffect(() => {
    if (arrivedMessage) {
      setMessages([
        ...messages,
        { user: arrivedMessage.user, message: arrivedMessage.message },
      ]);
    }
  }, [arrivedMessage]);

  return (
    <div className='live-chat'>
      {' '}
      <div className={`toggle ${!showLiveChat && 'message-icon'}`}>
        <a href='#!' onClick={() => setShowLiveChat(!showLiveChat)}>
          {showLiveChat ? 'Minimize' : <i className='fas fa-comments'></i>}
        </a>
        <span className='active-users'>
          {showLiveChat && `Active: ${connectedUsers}`}
        </span>
      </div>
      <div
        className='live-chat-content'
        style={{ display: `${showLiveChat ? 'block' : 'none'}` }}
      >
        <Messages messages={messages} />
        <Input setMessages={setMessages} messages={messages} socket={socket} />
      </div>
    </div>
  );
};

export default LiveChat;
