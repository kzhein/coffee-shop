import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import './Messages.css';

const Messages = ({ messages }) => {
  return (
    <ScrollToBottom className='messages'>
      <ul>
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            user={message.user}
            isCurrentUser={
              message.isCurrentUser ? message.isCurrentUser : false
            }
          />
        ))}

        {/* <Message
          message={
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae iure ad quidem laborum ex ea deleniti fugiat, quos natus optio.'
          }
        />
        <Message message={'This is john'} user={'john'} isCurrentUser={true} />
        <Message
          message={
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae iure ad quidem laborum ex ea deleniti fugiat, quos natus optio'
          }
          user={'alex'}
        />
        <Message message={'This is john'} user={'john'} />
        <Message message={'This is dean'} user={'dean'} /> */}
      </ul>
    </ScrollToBottom>
  );
};

export default Messages;
