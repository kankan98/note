const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{ cors: true});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  //服务端发送消息到客户端
  socket.emit('news', { hello: 'world'});
  // 服务端监听客户端发送的消息
  socket.on('msg from client', (data) => {
    // 将监听到的消息发给客户端
    io.emit('msg from server',data)
  })
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});