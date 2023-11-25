
// 1. IN TRAINER NAVBAR

socket.emit('join', trainerId);


// 2. IN server.js BACK-END

socket.on('join', (room) => {
  socket.join(room);
});


// 3. IN USER SIDE PAGE - FRONT END

socket.emit('notification_trainer', { count: response.data.count, room: response.data.room })



// 4. IN server.js BACK-END

socket.on('notification_trainer', async (data) => {
  console.log('Recived a notificationn in server');
  const { count, room } = data;
  io.to(room).emit('notification_trainer', { count, room });
})


5. IN TRAINER NAVBAR

socket.on('notification_trainer', (data) => {
  const { count, room } = data
  toast.success('You have a notification')
  setNotificationCount(count)
});