import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import ChatTitle from './ChatTitle.jsx';

class Conversation extends Component {

render() {
    console.log("Rendering <App />");

    return (
      <div className="chatContainer">
        <ChatTitle friend={this.props.conversation.friendname}/>
        <MessageList messages={this.props.conversation.messages}/>
        <ChatBar addNewMessage={this.props.addNewMessage} conversation={this.props.conversation}/>
      </div>
    );
  }
}
export default Conversation;