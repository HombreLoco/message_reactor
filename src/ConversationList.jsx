import React, {Component} from 'react';
import Conversation from './Conversation.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'


class ConversationList extends Component {

render() {
    console.log("Rendering <App />");

    var outputConversations;
    var allRoutes = [];
    if (this.props.conversations.length != 0) {
      outputConversations = this.props.conversations.map( conver => {
        allRoutes.push(<Route path={`/conversation/${conver.friendId}`} key={conver.friendId} component={() => (<Conversation conversation={conver} addNewMessage={this.props.addNewMessage}/>)}  />)
        return (
          <li key={conver.friendId}>
            <Link to={`/conversation/${conver.friendId}`}>{conver.friendname}</Link>
          </li>
            
        );
      });
      
    }
    return (
      <Router>
        <div>
          <div className="">
            <ul>
              {outputConversations}
            </ul>
          </div>
          {/*<Route path="/conversation/:id" handler={FindConversation} />*/}
          {/*<Route path="/conversation/:id" component={Conversation} />*/}
          {allRoutes}
        </div>
      </Router>
      
      // {/*<div className="chatContainer">
      //   <ChatTitle friend={this.state.friendname}/>
      //   <MessageList messages={this.state.messages}/>
      //   <ChatBar addNewMessage={this.handleAddNewMessage}/>
      // </div>*/}
    );
  }
}
export default ConversationList;