import React, { useRef, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import './Input.css';

const Input = ({ messages, setMessages, socket }) => {
  const { user } = useContext(AuthContext);
  const text = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    if (text.current.value.trim() === '')
      return alert('Please type something first!');

    const message = text.current.value;
    const data = {
      user: user ? user.name : 'user',
      message,
    };

    socket.emit('sendMessage', data);

    text.current.value = null;

    setMessages([
      ...messages,
      { user: data.user, message: data.message, isCurrentUser: true },
    ]);
  };

  return (
    <form className='live-chat-input' onSubmit={onSubmit}>
      <input type='text' ref={text} />
      <button>send</button>
    </form>
  );
};

export default Input;
