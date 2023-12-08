const express = require('express')
const app = express()
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const userController = require("../server/controller/userController")

const dbConfig = require('./config/dbConfig')
require('dotenv').config();

app.use(cors());
app.use(express.json())

const userRoute = require("./routes/userRoute")
const adminRoute = require('./routes/adminRoute')
const trainerRoute = require('./routes/trainerRoute')
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/trainer', trainerRoute)

// edit
const io = socketIo(server, { 
    cors: { 
      origin: "*", 
    } 
  });
  app.use("/socket.io", express.static("node_modules/socket.io-client/dist"));

  
io.on('connection', (socket) => {

    socket.on('join', (room) => {
            socket.join(room);
    });
    

    socket.on('notification_trainer', async (data) => {
        const { count, room } = data;
        io.to(room).emit('notification_trainer', { count, room});
    })

    socket.on('notification_user', async (data) => {
        const { count, room } = data;
        io.to(room).emit('notification_user', { count, room});
    })


    socket.on('class_start_roomid_pass', async (data) => {
        const { rooms } = data;

        if (Array.isArray(rooms)) {
            rooms.forEach((room) => {
                io.to(room).emit('class_start_roomid_pass', {room});
            });
        } else {
            // If rooms is not an array, treat it as a single room ID
            io.to(rooms).emit('class_start_roomid_pass', {rooms});
        }
    })

    socket.on('chat', async (data) => {
        console.log('ureeeeeeeeeeeeeeeeeeeeeeeeeekaaaaaaaaaaaaaaaaaa')
        const { room, text, sender } = data;
        await userController.chatHistory(room, text, sender)
        io.to(room).emit('chat', { text, sender, room });
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})
// edit

const port = process.env.PORT || 5000

// changed tovserver.listen (initially it was app.listen)
server.listen(port, () => console.log(`server started at the port ${port}`));

// require('./cron-jobs/notificationTask')
