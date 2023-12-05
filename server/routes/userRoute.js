const express = require('express')
const route = express()
const userController = require("../controller/userController")
const authMiddleware = require('../middlewares/authUser')
const errorHandlingMiddleware = require('../middlewares/errorHandlingMiddleware')
const TrainerModel = require('../models/trainerModel')
const upload = require('../config/multerUser')


route.post("/register", userController.registerUser);
route.post("/otp", userController.verifyOtp);
route.post("/login", userController.loginUser);
route.post("/google-login", userController.googleLogin);
route.post("/forgotpassword", userController.forgotPassword);
route.post("/resetPassword", userController.resetPassword);

route.post("/edit-profile", upload.upload.single('image'), authMiddleware, errorHandlingMiddleware, userController.editProfile);

route.use(authMiddleware)
route.use(errorHandlingMiddleware)

route.post("/get-user-info-by-id", userController.authorization);
route.post("/verify-payment", userController.verifyPayment);
route.post("/place-order", userController.placeOrder);
route.post("/review", userController.writeReview);
route.post("/update-notification-status", userController.updateNotificationStatus);

route.get("/get-userdata",userController.authorization);
route.get("/categoryList", userController.categoryList);
route.get("/coursesList", userController.coursesList);
route.get("/selected-courseList", userController.selectedCoursesList);
route.get("/purchaselist", userController.purchaseList);
route.get("/get-reviews", userController.getReviews);
route.get("/notification-count", userController.notificationCount);
route.get("/get-notifications", userController.getNotifications);
route.get("/get-user-name", userController.getUsername);
route.get("/get-user-data", userController.authorization);
route.get("/get-admin-data", userController.getAdmindata);



route.delete("/cancel-purchase", userController.cancelpurchase);




module.exports = route
