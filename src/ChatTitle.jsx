import React, {Component} from 'react';

class ChatTitle extends Component {

  render() {
    return (
      <div className="chatTitle">
        <div className="chatTitleCenter">
          <span className="chatTitleMessage">
            Chatting with: 
          </span>
          {this.props.friend}
        </div>
      </div>
    );
  }

}

export default ChatTitle