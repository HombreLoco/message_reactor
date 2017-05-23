import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log("creator", this.props.creator);
    return(
      <div className="chatMessage">
        <span className={this.props.creator}>{this.props.userId}</span>
        <span className={this.props.creator}>{this.props.content}</span>
        <br/>
        <div></div>
      </div>
    );
  }
}

export default Message;