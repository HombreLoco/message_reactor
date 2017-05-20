import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
      <div className="chatWindow">
        <div className="chatWindowFadeTop"></div>
        <Message/>
      </div>
    );
  }
}

export default MessageList;