import React, {Component} from 'react';
import FaMailForward from 'react-icons/lib/fa/mail-forward';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    // this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  sendNewMessage = () => {
    if (this.textInput.value != "") {
      let newMessage = {};
      newMessage.content = this.textInput.value;
      newMessage.friendId = this.props.conversation.friendId;
      newMessage.friendname = this.props.conversation.friendname;
      this.textInput.value = "";
      this.props.addNewMessage(newMessage);
    }
  }

  handleMessageSubmit = (e) => {
    this.sendNewMessage();
  }

  handleChatBarKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.sendNewMessage();
    }
  }

  render() {
    return (
      <div className="chatBar">
        <input 
          className="chatBarMessage" 
          placeholder="Message..." 
          ref={(input) => { this.textInput = input; }} 
          onKeyPress={this.handleChatBarKeyPress}/>
        <span 
          className="chatSend" 
          onClick={this.handleMessageSubmit}>
          <FaMailForward/>
        </span>
      </div>
    );
  }
}

export default ChatBar;