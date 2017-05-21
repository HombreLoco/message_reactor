import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuidV4 = require('uuid/v4');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "Jacques",
      userId: uuidV4(),
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  handleAddNewMessage = (message) => {
    message.username = this.state.username;
    message.userId = this.state.userId;
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {

      this.socket.onmessage = (rawMessage) => {
        let newMessage = JSON.parse(rawMessage.data);
        if (newMessage.userId != this.state.userId) {
          newMessage.creator = "chatRightUsername";
        } else {
          newMessage.creator = "chatLeftUsername";
        }
        this.state.messages.push(newMessage);
        this.setState({messages: this.state.messages});
      }
    };
  }
  

  render() {
    console.log("Rendering <App />");
    return (
      <div className="chatContainer">
        <MessageList messages={this.state.messages}/>
        <ChatBar addNewMessage={this.handleAddNewMessage}/>
      </div>
    );
  }
}
export default App;
