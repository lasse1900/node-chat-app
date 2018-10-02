const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'jenny@exmaple.com',
    text: 'Hey, what is going on',
    createdAt: 'tue, 2018/10/02'
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });

  socket.on('disconnect',() => {
      console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
});