import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
      <div className="chatWindow">
        <Message/>
      </div>
    );
  }
}

export default MessageList;