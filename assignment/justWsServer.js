const http = require('http'); // this is the built-in http module in Node.js
const ws = require('ws'); // this is the WebSocket library for Node.js, which is 3rd party and needs to be installed via npm
const http_server = http.createServer((req, res) => {    // this is the HTTP server that will handle incoming requests
  //res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is a WebSocket server!');
});
const wss = new ws.Server({ server:http_server }); // this creates a WebSocket server that shares the same HTTP server
wss.on('headers', (headers) => { // this event is triggered when the WebSocket server is ready to send headers to the client
  //handshake headers are sent to the client when a new WebSocket connection is established, 
  //and this event allows you to modify or log those headers before they are sent
  console.log(headers);
  console.log('WebSocket server is ready to send headers');
});
wss.on('connection', (socket, req) => { // this event is triggered when a new WebSocket connection is established
  console.log('A new client has connected');
  socket.send('Welcome to the WebSocket server!!!'); // send a welcome message to the client
  console.log(req);
  socket.on('message', (message) => { // this event is triggered when a message is received from the client
    console.log('Received message from client: ' + message);
    //Caution! create a loop back effect if you send a message back to the client in response to a message received from the client, 
    // and the client is programmed to send a message back to the server in response to any message received from the server. 
    // This can lead to an infinite loop of messages being sent back and forth between the client and server, which can cause performance issues and potentially crash the server or client. 
    //socket.send('Server received your message: ' + message); // Don't do this if the client is programmed to respond to any message from the 
    // server, as it will create a loop back effect
  });
});
http_server.listen(8080); // the server will listen on port 8080
console.log('HTTP server is listening on port 8080');