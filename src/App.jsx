import React, {Component} from 'react';
import ConversationList from './ConversationList.jsx';
const uuidV4 = require('uuid/v4');
const faker = require('faker');
// var prompt = require('prompt');
// var rl = require("readline");


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "", //faker.name.findName(),
      userId: "", //"db12efcf-dd4b-4337-8def-17a8a8385ebe", //uuidV4(),
      friendname: "", //faker.name.findName(),
      friendId: "", //"fdb3dbe3-63d4-49de-ba9c-b759239ebbbc", //uuidV4(),
      messages: [],
      conversations: [
        {
          friendname: "Kim",
          friendId: 1,
          messages: [
                      {
                        id: 1,
                        userId: 4,
                        friendId: 1,
                        content: "Hello",
                        date: 1
                      },
                      {
                        id: 2,
                        userId: 1,
                        friendId: 4,
                        content: "Bye",
                        date: 2
                      }
                    ]
         },
         {
           friendname: "Mary",
           friendId: 2,
           messages: [
                      {
                        id: 3,
                        userId: 2,
                        friendId: 4,
                        content: "Yay!",
                        date: 3
                      },
                      {
                        id: 4,
                        userId: 4,
                        friendId: 2,
                        content: "Awww!",
                        date: 4
                      }
                    ]
         },
         {
           friendname: "Casey",
           friendId: 3,
           messages: [
                      {
                        id: 5,
                        userId: 4,
                        friendId: 3,
                        content: "Yes!",
                        date: 10
                      },
                      {
                        id: 6,
                        userId: 3,
                        friendId: 4,
                        content: "Always!",
                        date: 11
                      }
                    ]
         },
         {
           friendname: "Jacques",
           friendId: 4,
           messages: [
                      {
                        id: 7,
                        userId: 4,
                        friendId: 3,
                        content: "Yo!",
                        date: 10
                      },
                      {
                        id: 8,
                        userId: 3,
                        friendId: 4,
                        content: "Dawg!",
                        date: 11
                      }
                    ]
         }
      ]
    }
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  handleAddNewMessage = (message) => {
    console.log("here again");
    console.log(message);
    message.username = this.state.username;
    message.userId = this.state.userId;
    // message.friendname = this.state.friendname;
    // message.friendId = this.state.friendId;
    this.socket.send(JSON.stringify(message));
  }

  setMessageStyling = (message) => {
    console.log("step 2");
    console.log("in styling 1");
    console.log("message in styling: ", message);
    console.log("state: ", this.state.userId);
    if (message.friendId === this.state.userId) {
      console.log("in styling 2");
      message.creator = "chatLeftUsername";
      console.log("LeftUser", message);
    } else if (message.userId === this.state.userId) {
      console.log("in styling 3");
      message.creator = "chatRightUsername";
      console.log("RightUser", message);
    } 
    return message;
  }

  socketInitializer = () => {
    const initializer = {};
    initializer.initialize = true;
    // initializer.userId = this.state.userId;
    this.socket.send(JSON.stringify(initializer));
  }

  socketInitializerFriend = () => {
    const initializer = {};
    initializer.initialize = true;
    // initializer.userId = this.state.friendId;
    this.socket.send(JSON.stringify(initializer));
  }

  setStateConversations = () => {
    console.log("step 4");
    this.setState({conversations: this.state.conversations});
  }

  afterMessageInitialization = (newMessage, callback) => {
    this.state.userId = newMessage.userId;
    this.state.username = newMessage.username;
    this.state.friendId = newMessage.friendId;
    this.state.friendname = newMessage.friendname;
    this.state.conversations.forEach(conver => {
      conver.messages.forEach(message => {
        console.log("before styling");
        this.setMessageStyling(message);
      });
    });
    console.log("callback");
    callback();
  }

  fillConversations = (newMessage, callback) => {
    console.log("step 3");
    this.state.conversations.forEach( conver => {
      if (conver.friendId === newMessage.userId) {
        conver.messages.push(
          {
            id: newMessage.id,
            content: newMessage.content,
            userId: newMessage.userId,
            friendId: newMessage.friendId,
            creator: newMessage.creator
          }
        )
      }
      callback();
    });
  }

  afterNewMessage = (newMessage, callback) => {
    console.log("step 1");
    callback(this.setMessageStyling(newMessage), this.setStateConversations);
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {

      this.socketInitializer();
      this.socketInitializerFriend();

      
      this.socket.onmessage = (rawMessage) => {
        let newMessage = JSON.parse(rawMessage.data);
        if (newMessage.initialize) {
          this.afterMessageInitialization(newMessage, this.setStateConversations);
        } else {
          console.log("hereherehere");
          this.afterNewMessage(newMessage, this.fillConversations);
          
        }
      }
    };
  }
  

  render() {
    console.log("Rendering <App />");
    return (
      <div className="chatContainer">
        <ConversationList conversations={this.state.conversations} addNewMessage={this.handleAddNewMessage}/>


        {/*<ConversationList 
          friend={this.state.friendname}
          messages={this.state.messages}
          addNewMessage={this.handleAddNewMessage}/>*/}
      </div>
    );
  }
}
export default App;
