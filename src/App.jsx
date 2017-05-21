import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuidV4 = require('uuid/v4');
const faker = require('faker');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: faker.name.findName(),
      userId: uuidV4(),
      friendname: faker.name.findName(),
      friendId: uuidV4(),
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  handleAddNewMessage = (message) => {
    message.username = this.state.username;
    message.userId = this.state.userId;
    message.friendname = this.state.friendname;
    message.friendId = this.state.friendId;
    this.socket.send(JSON.stringify(message));
  }

  setMessageStyling = (message) => {
    if (message.userId != this.state.userId) {
      message.creator = "chatRightUsername";
    } else {
      message.creator = "chatLeftUsername";
    }
  }

  loadMessages = () => {
    const allMessages = [
      {
        id: uuidV4(),
        username: this.state.username,
        userId: this.state.userId,
        friendname: this.state.friendname,
        friendId: this.state.friendId,
        content: "Hello there!"
      },
      {
        id: uuidV4(),
        username: this.state.friendname,
        userId: this.state.friendId,
        friendname: this.state.username,
        friendId: this.state.userId,
        content: "Hello there!"
      }
    ]
    allMessages.forEach((message) => {
      this.setMessageStyling(message);
    })

    this.setState({messages: allMessages});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {

      this.loadMessages();

      this.socket.onmessage = (rawMessage) => {
        let newMessage = JSON.parse(rawMessage.data);
        this.setMessageStyling(newMessage);
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
