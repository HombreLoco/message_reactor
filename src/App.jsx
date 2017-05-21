import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App />");
    return (
      <div className="chatContainer">
        <MessageList/>
        <ChatBar/>
      </div>
    );
  }
}
export default App;
