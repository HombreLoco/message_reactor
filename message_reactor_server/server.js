const SocketServer = require('ws');
const uuidV4 = require('uuid/v4');
// var rl = require("readline");
var prompt = require('prompt');



// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer.Server({ port: PORT });
const allUserConnections = {};

// send message to each user
const broadcastAll = (message) => {
  wss.clients.forEach((c) => {
    c.send(JSON.stringify(message));
  })
}

// return message to sender
const broadcastSelf = (message) => {
  allUserConnections[message.userId].send(JSON.stringify(message));
}

//send message to sender and recipient
const broadcast = (message) => {
  allUserConnections[message.userId].send(JSON.stringify(message));
  if (allUserConnections[message.friendId]) {
    allUserConnections[message.friendId].send(JSON.stringify(message));
  } else {
    console.log("user is away right now...");
  }
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on("message", (rawMessage) => {
    const message = JSON.parse(rawMessage);
    if (message.initialize && message.initialize === true) {
      function getPrompt(message, callback) {
        prompt.start();
        prompt.get(['userId', 'username', 'friendId', 'friendname'], function (err, result) {
          message.userId = parseInt(result.userId);
          message.username = result.username;
          message.friendId = parseInt(result.friendId);
          message.friendname = result.friendname;
          console.log('Command-line input received:');
          console.log('  userId: ' + result.userId);
          console.log('  username: ' + result.username);
          console.log("1");
          callback(message);
        });

      }
      function sendMessage(message) {
        console.log("2");
        // let socketObj = {};
        allUserConnections[message.userId] = ws;
        broadcastSelf(message);
      }
      getPrompt(message, sendMessage);

    } else {
        const message = JSON.parse(rawMessage);
        message.id = uuidV4();
        //save message to database
        broadcast(message);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});