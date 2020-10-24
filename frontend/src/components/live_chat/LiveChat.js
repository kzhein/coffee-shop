import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Messages from './Messages';
import Input from './Input';
import './LiveChat.css';

let socket;

class LiveChat extends Component {
  state = {
    messages: [],
    showLiveChat: false,
    connectedUsers: 0,
  };

  componentDidMount() {
    socket = openSocket('/');

    socket.on('newMessage', data => {
      this.setState({
        messages: [
          ...this.state.messages,
          { user: data.user, message: data.message },
        ],
      });
    });

    socket.on('connectedUsers', connectedUsers => {
      this.setState({ connectedUsers });
    });
  }

  componentWillUnmount() {
    socket.close();
  }

  sendMessage(data) {
    socket.emit('sendMessage', data);
  }

  setMessages(data) {
    this.setState({
      messages: [
        ...this.state.messages,
        { user: data.user, message: data.message, isCurrentUser: true },
      ],
    });
  }

  render() {
    return (
      <div className='live-chat'>
        {' '}
        <div className={`toggle ${!this.state.showLiveChat && 'message-icon'}`}>
          <a
            href='#!'
            onClick={() =>
              this.setState({ showLiveChat: !this.state.showLiveChat })
            }
          >
            {this.state.showLiveChat ? (
              'Minimize'
            ) : (
              <i class='fas fa-comments'></i>
            )}
          </a>
          <span className='active-users'>
            {this.state.showLiveChat && `Active: ${this.state.connectedUsers}`}
          </span>
        </div>
        <div
          className='live-chat-content'
          style={{ display: `${this.state.showLiveChat ? 'block' : 'none'}` }}
        >
          <Messages messages={this.state.messages} />
          <Input
            setMessages={this.setMessages.bind(this)}
            sendMessage={this.sendMessage}
            socket={this.state.socket}
          />
        </div>
      </div>
    );
  }
}

export default LiveChat;
