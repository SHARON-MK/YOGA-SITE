const cron = require('node-cron');

const listedArrays = [
  // Your array of user information
];

const sendDailyNotifications = () => {
  // Your notification logic
  console.log('Sending notifications...');
};

// Schedule the task to run every minute for testing (adjust to your desired schedule)
cron.schedule('* * * * *', () => {
  sendDailyNotifications();
});