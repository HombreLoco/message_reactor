import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  sendMessage = () => {
    let message = {};
    message.content = "Dinner time!";
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {

      this.sendMessage();

      this.socket.onmessage = (rawMessage) => {
        let newMessage = JSON.parse(rawMessage.data);
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
        <ChatBar/>
      </div>
    );
  }
}
export default App;
