const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require('dotenv').config({ path: '../.env' });

// configure express
app.use(cors());
app.use(express.json());

// route for the root URL
app.get('/', (req, res) => {
  res.send('This is socket server!');
});

// connected users
let users = [];

// add a new user to the users array
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

// remove the user from users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// find a user in the users array base on ID
const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

// create new message object
const createMessage = ({ senderId, receiverId, content, images }) => ({
  senderId,
  receiverId,
  content,
  images,
});

// listener for socket connection
io.on('connection', (socket) => {
  console.log(`a user is connected`);
  
  // when user connects, add this user to users array,
  // and emit a getUser to all connected clients with the updated users array
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  const messages = {};

  // listener for incoming messages
  socket.on('sendMessage', ({ senderId, receiverId, content, images }) => {
    const message = createMessage({ senderId, receiverId, content, images });

    // get the user from users array
    const receiver = getUser(receiverId);
    const sender = getUser(senderId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // emit to the user with the updated messages array.
    io.to(receiver?.socketId).emit('getMessage', message);
    io.to(sender?.socketId).emit('getMessage', message);
  });

  // listener for incoming updateLastMessage events
  socket.on('updateLastMessage', ({ lastMessage, lastMessagesId }) => {
    // emit the 'getLastMessage' event to all connected clients
    io.emit('getLastMessage', {
      lastMessage,
      lastMessagesId,
    });
  });

  //  listener for socket disconnections
  socket.on('disconnect', () => {
    console.log(`a user disconnected!`);
    // remove the user from the users array and emit a getUsers event to all connected clients
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

server.listen(process.env.SOCKET_PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.SOCKET_PORT || 4000}`);
});
