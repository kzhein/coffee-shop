import React from 'react';
import './Message.css';

const Message = ({ message, user, isCurrentUser }) => {
  return (
    <div className='message-container'>
      {!isCurrentUser && <span>{user ? user : 'user'}: </span>}

      <li className={`message ${isCurrentUser ? 'current-user' : ''}`}>
        {message}
      </li>
    </div>
  );
};

export default Message;
