import React, {Component} from 'react';
import FaMailForward from 'react-icons/lib/fa/mail-forward';

class ChatBar extends Component {

  render() {
    return (
      <div className="chatBar">
        <input className="chatBarMessage" placeholder="Message..."/>
        <a href="#"><span className="chatSend"><FaMailForward/></span></a>
      </div>
    );
  }
}

export default ChatBar;