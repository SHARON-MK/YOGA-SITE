const express = require('express')
const app = express()
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');

const dbConfig = require('./config/dbConfig')
require('dotenv').config();

app.use(cors({ origin: 'http://localhost:3000', }));
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
      origin: ['http://localhost:3000'], 
    } 
  });
  app.use("/socket.io", express.static("node_modules/socket.io-client/dist"));

  
io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('join', (room) => {
        console.log('room created for',room);
        socket.join(room);
    });

    socket.on('notification_trainer', async (data) => {
        console.log('Recived a notificationn for trainer');
        const { count, room } = data;
        io.to(room).emit('notification_trainer', { count, room});
    })

    socket.on('notification_user', async (data) => {
        console.log('Recived a notificationn for user');
        const { count, room } = data;
        console.log(room)
        io.to(room).emit('notification_user', { count, room});
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
