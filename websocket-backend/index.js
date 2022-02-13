const express = require('express');
const app = express();

// create http server with node.js
const http = require('http');
const server = http.createServer(app);

// import socket.io and create a new server
const { Server } = require('socket.io');
const socket = new Server(server, {
  cors: {
    origin: '*',
  },
});

// listen if user is connected
// each time user send to the client,
// the message is spreadout to every clients who are connected to the server
socket.on('connection', (client) => {
  console.log(client);
  console.log("idClient",client.id);
  client.on('message', (data) => {
    console.log(data);
    socket.emit('message', (data))
  });
});

server.listen(8000, () => {
  console.log('server running on port 8000');
});
