import React, {Component} from 'react';

class Message extends Component {

  render() {
    return(
      <div className="chatMessage">
        <span className={this.props.creator}>{this.props.username}</span>
        <span className={this.props.creator}>{this.props.content}</span>
        <br/>
      </div>
    );
  }
}

export default Message;