require("dotenv").config({path:__dirname+'/.env'});
const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app)

const router = require('./router');
const { addUser, getUsersInRoom, removeUser, getUser } = require('./users');
const formatMessages = require('./utils/messages');

app.use('/api', router)

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });


io.on('connection', socket => {

    // Broadcast when a user connects
    // console.log('message', 'Someone just entered the waiting room');

    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({id: socket.id, name, room});

      if (error) return callback(error)
    
      socket.emit('message', formatMessages('Chat Bot', "Welcome to John's Chat App", true));
      socket.broadcast.to(user.room).emit('message', formatMessages('Chat Bot', `${user.name} has joined`, true));

      socket.join(user.room);

      io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    });

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', formatMessages(user.name, message, false));

        callback();
      }
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = getUser(socket.id)

      if (user) {
        removeUser(socket.id)
        socket.broadcast.to(user.room).emit('message', formatMessages('Chat Bot', `${user.name} has left`, true));
        io.to(user?.room).emit('roomData', {room: user?.room, users: getUsersInRoom(user?.room)})
      }
    });
})


// Serve static asests if in production
if(process.env.NODE_ENV === 'production') {

  let root = path.join(__dirname, 'frontend', 'build/')
  app.use(express.static(root))
  app.use(function(req, res, next) {

      if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
          res.sendFile('index.html', { root })
      } else next()
  })
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))