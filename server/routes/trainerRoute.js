const express = require('express')
const route = express()

const authMiddleware = require('../middlewares/authTrainer')
const errorHandlingMiddleware = require('../middlewares/errorHMtrainer')
const trainerController = require('../controller/trainerController')
const upload = require('../config/multerCourse')
const uploadTwo = require('../config/multerTrainer')

route.post('/register',uploadTwo.upload.single('idcard'),trainerController.register)
route.post('/otp',trainerController.verifyOtp)
route.post('/login',trainerController.login)
route.post('/google-login',trainerController.googleLogin)
route.post('/forgotpassword',trainerController.forgotPassword)
route.post('/resetPassword',trainerController.resetPassword)

route.post("/edit-profile",uploadTwo.upload.single('image'),authMiddleware, errorHandlingMiddleware,trainerController.editProfile);
route.post("/course_registration",upload.upload.single('image'),authMiddleware, errorHandlingMiddleware, trainerController.courseRegistration);
route.post("/course_edit",upload.upload.single('image'),authMiddleware, errorHandlingMiddleware, trainerController.courseEdit);

route.use(authMiddleware,errorHandlingMiddleware)

route.post("/get-trainer-info-by-id", trainerController.authorization);
route.get("/get-trainerdata", trainerController.authorization);
route.get("/categoryList", trainerController.categoryList);
route.get("/get-reviews", trainerController.getReviews);
route.get("/notification-count", trainerController.notificationCount);
route.get("/get-notifications", trainerController.getNotifications);
route.get("/get-classdetails", trainerController.getClassDetails);
route.get("/get-allusers-fornotification", trainerController.getAllUsersForNotification);
route.get("/get-trainer-name", trainerController.getTrainerName);

route.post("/update-notification-status", trainerController.updateNotificationStatus);

route.get("/list-services", trainerController.listServices);
route.delete("/delete-course", trainerController.courseDeletion);



module.exports = route
