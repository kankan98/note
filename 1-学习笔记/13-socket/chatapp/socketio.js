const socketio = {};

function getSocket(server) {
  socketio.io = require('socket.io')(server,{ cors: true});
  let io = socketio.io;
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
}

socketio.getSocket = getSocket;

module.exports = socketio