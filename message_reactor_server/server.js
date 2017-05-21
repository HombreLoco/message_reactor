const SocketServer = require('ws');
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer.Server({ port: PORT });

// send message to each user
const broadcastAll = (message) => {
  wss.clients.forEach((c) => {
    c.send(JSON.stringify(message));
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on("message", (rawMessage) => {
    const message = JSON.parse(rawMessage);
    message.id = uuidV4();
    console.log("A message");
    broadcastAll(message)
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});