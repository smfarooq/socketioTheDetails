const http = require('http'); // this is the built-in http module in Node.js
const ws = require('ws'); // this is the WebSocket library for Node.js, which is 3rd party and needs to be installed via npm
const http_server = http.createServer((req, res) => {    // this is the HTTP server that will handle incoming requests
  //res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is a WebSocket server!');
});
const wss = new ws.Server({ server:http_server }); // this creates a WebSocket server that shares the same HTTP server
wss.on('headers', (headers) => { // this event is triggered when the WebSocket server is ready to send headers to the client
  console.log(headers);
  console.log('WebSocket server is ready to send headers');
});
wss.on('connection', (socket, req) => { // this event is triggered when a new WebSocket connection is established
  console.log('A new client has connected');
  socket.send('Welcome to the WebSocket server!!!'); // send a welcome message to the client
  console.log(req);
});
http_server.listen(8080); // the server will listen on port 8080
console.log('HTTP server is listening on port 8080');