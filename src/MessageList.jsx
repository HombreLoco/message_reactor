import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {

    var outputMessages;
    if (this.props.messages.length != 0) {
      this.props.messages.forEach(function(item) {
      })
      outputMessages = this.props.messages.map( message => {
        return <Message key={message.id} {...message}/>
      })
    } else {
      outputMessages = <span className="">There's no time like the present to make an introduction</span>
    }

    return (
      <div className="chatWindow">
        {outputMessages}
      </div>
    );
  }
}

export default MessageList;