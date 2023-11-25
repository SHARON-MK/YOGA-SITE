const userModel = require('../models/userModel')
const categoryModel = require('../models/categoryModel')
const courseModel = require('../models/courseModel')
const orderModel = require('../models/orderModel')
const trainerNotificationModel = require('../models/notificationTrainer')
const userNotificationModel = require('../models/notificationUser')
const ratingModel = require('../models/ratingModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { sendVerifymail, sendForgetPasswordMail } = require('../config/nodeMailer')
const encryptPassword = require('../config/passwordEncrypting')
const randomstring = require('randomstring')
const Razorpay = require('razorpay')
const sharp = require('sharp')
const path = require('path');
const TrainerModel = require('../models/trainerModel')

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

var instance = new Razorpay({
    key_id: process.env.razorpayId,
    key_secret: process.env.razorpayKey
});

const registerUser = async (req, res) => {
    try { // trim part- if the obj passed id undefined or empty trim cant perform and throw error to frontend directly - so check firts
        if ((!req.body.name || req.body.name.trim().length === 0) || (!req.body.email || req.body.email.trim().length === 0) || (!req.body.password || req.body.password.trim().length === 0) || (!req.body.confirmpassword || req.body.confirmpassword.trim().length === 0)) {
            return res.status(200).send({ message: "All fields should be filled", success: false });
        }

        // for easy usage changed like this - but in the above if we cannot use bcoz if any undefined obj presents directly throw error
        req.body.name = req.body.name.trim();
        req.body.email = req.body.email.trim();
        req.body.password = req.body.password.trim();
        req.body.confirmpassword = req.body.confirmpassword.trim();

        // email format check  and  email already used check
        const isEmailValid = (email) => {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailPattern.test(email);
        }
        if (isEmailValid(req.body.email)) {
            const userExists = await userModel.findOne({ email: req.body.email })
            if (userExists) {
                return res.status(200).send({ message: 'Email already used', success: false })
            }
        } else {
            return res.status(200).send({ message: "Invalid email format", success: false });
        }

        //
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.status(200).send({ message: "Password should contain Lowercase letter, Uppercase letter, Digit, Special character, and be at least 6 characters long.", success: false });
        }
        else if (req.body.password != req.body.confirmpassword) {
            return res.status(200).send({ message: "Passwords doesnt match", success: false });
        }

        const hashedPassword = await encryptPassword(req.body.password)
        req.body.password = hashedPassword

        const newUser = new userModel(req.body)
        const userData = await newUser.save()

        if (userData) {
            const otpGenarated = Math.floor(1000 + Math.random() * 9999);
            sendVerifymail(req.body.name, req.body.email, otpGenarated);
            await userModel.updateOne({ email: req.body.email }, { $set: { otp: otpGenarated } })
        }
        res.status(201).send({ message: 'Your account has been created, verify mail', success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error creating the user', success: false, "error": "Internal server error. Please try again later." })
    }
};

const verifyOtp = async (req, res) => {
    try {
        if (!req.body.otp) { return res.status(200).send({ message: 'Must enter the OTP', success: false }) }

        const otpEntered = req.body.otp.trim()
        const userVerified = await userModel.findOne({ otp: otpEntered })
        if (userVerified) {
            await userModel.updateOne({ otp: otpEntered }, { $set: { email_verification: true } })
            return res.status(200).send({ message: 'Account Verifies', success: true })
        }
        else {
            return res.status(200).send({ message: 'Incorrect OTP', success: false })
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error verifying otp', success: false, "error": "Internal server error. Please try again later." })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: 'User does not exist', success: false })
        }

        const email_verification = user.email_verification
        if (!email_verification) {
            return res.status(200).send({ message: 'Please verify your email', success: false })
        }

        const blocked = user.blocked
        if (blocked) {
            return res.status(200).send({ message: 'Your Account has been blocked', success: false })
        }

        const passMatch = await bcrypt.compare(req.body.password, user.password)
        if (!passMatch) {
            return res.status(200).send({ message: 'Password is incorrect', success: false })
        } else {
            const token = jwt.sign({ id: user._id, role: "USER" }, process.env.JWT_SECRET_USER, { expiresIn: '1d' })
            res.status(200).send({ message: 'Login successfull', success: true, data: token })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error Logging in', success: false, "error": "Internal server error. Please try again later." })

    }
}

const googleLogin = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (user) {
            const email_verification = user.email_verification
            if (!email_verification) {
                return res.status(200).send({ message: 'Please verify your email', success: false })
            }

            const blocked = user.blocked
            if (blocked) {
                return res.status(200).send({ message: 'Your Account has been blocked', success: false })
            }

            const token = jwt.sign({ id: user._id, role: "USER" }, process.env.JWT_SECRET_USER, { expiresIn: '1d' })
            res.status(200).send({ message: 'Login successfull', success: true, data: token })
        }
        else {

            const newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: 123456,
                email_verification: true
            });
            const userData = await newUser.save();
            if (userData) {
                const token = jwt.sign({ id: newUser._id, role: "USER" }, process.env.JWT_SECRET_USER, { expiresIn: '1d' })
                res.status(200).send({ message: 'Login successfull', success: true, data: token })
            }

        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error Logging in', success: false, "error": "Internal server error. Please try again later." })

    }
}

const authorization = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false })
        } else {
            return res.status(200).send({ success: true, data: user })
        }
    } catch (error) {
        return res.status(500).send({ message: "Error getting user info", success: false, error })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const userDb = await userModel.findOne({ email: req.body.email })
        if (!userDb) {
            return res.status(200).send({ message: 'No account is linked with this email ID', success: false })
        }
        const token = randomstring.generate()
        await userModel.updateOne({ email: req.body.email }, { $set: { token: token } })
        sendForgetPasswordMail(userDb.name, req.body.email, token)
        res.status(200).send({ message: 'Click on the link sent to your mail to reset password', success: true })
    } catch (error) {
        res.status(500).send({ message: "Error in forgot password", success: false, error })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, cpassword, token } = req.body;
        const userData = await userModel.findOne({ token: token })
        if (!userData) {
            return res.status(500).send({ message: 'Wrong link', success: false })
        }
        if (password && cpassword && password.trim() && cpassword.trim() && password === cpassword) {
            const hashedPassword = await encryptPassword(password)
            await userModel.updateOne({ token: token }, { password: hashedPassword })
            res.status(200).send({ message: 'New password created', success: true })
        }
        else {
            res.status(200).send({ message: 'Password does not match', success: false })
        }
    } catch (error) {
        res.status(500).send({ message: "Error in reset password", success: false, error })
    }
}

const editProfile = async (req, res) => {
    try {
        const id = req.body.userId
        const name = req.body.name
        const age = req.body.age
        const city = req.body.city
        const country = req.body.country
        if (name !== "") {
            await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { name: name } }
            );
        }
        if (age !== 0) {
            await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { age: age } }
            );
        }
        if (city !== '') {
            await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { city: city } }
            );
        }
        if (country !== '') {
            await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { country: country } }
            );
        }

        if (req.file) {
            const image = req.file.filename;
            const imagePath = path.join(__dirname, "../uploads/userImages/", image);
            const resizedImagePath = path.join(__dirname, "../uploads/userImagesResized/", image);

            // Resize image using sharp
            await sharp(imagePath)
                .resize(500, 500)
                .toFile(resizedImagePath);

            const data = await cloudinary.uploader.upload(resizedImagePath);
            const imageURL = data.secure_url;

            await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { image: imageURL } }
            );
        }

        res.status(200).send({ message: 'User Profile updated', success: true })
    } catch (error) {
        res.status(500).send({ message: "Error in editing profile", success: false, error })
    }
}

const categoryList = async (req, res) => {
    try {
        const categoryList = await categoryModel.find()
        if (!categoryList) {
            return res.status(200).send({ message: 'No categories exist', success: false })
        }
        res.status(200).send({ message: 'Category Fetched successfully', success: true, data: categoryList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}


const coursesList = async (req, res) => {
    try {
        const coursesList = await courseModel.find()
        if (!coursesList) {
            return res.status(200).send({ message: 'No course exist', success: false })
        }
        res.status(200).send({ message: 'courses Fetched successfully', success: true, data: coursesList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}

const selectedCoursesList = async (req, res) => {
    try {
        const coursesList = await courseModel.find()
        const category = req.query.category;
        const search = req.query.search;
        const order = req.query.order;


        let filteredCourses = [...coursesList];

        // Filter by category
        if (category) {
            filteredCourses = filteredCourses.filter(course => course.category === category);
        }

        // Filter by search query
        if (search) {
            const lowerCaseQuery = search.toLowerCase();
            filteredCourses = filteredCourses.filter(course =>
                course.course_name.toLowerCase().includes(lowerCaseQuery)
            );
        }


        // Sort by amount
        filteredCourses.sort((a, b) => {
            const amountA = parseFloat(a.amount);
            const amountB = parseFloat(b.amount);
            return order === 'asc' ? amountA - amountB : amountB - amountA;
        });



        if (!filteredCourses) {
            return res.status(200).send({ message: 'No course exist', success: false })
        }
        res.status(200).send({ message: 'courses Fetched successfully', success: true, data: filteredCourses })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}

let trainerIdForNotification;
let placedOrder;

const placeOrder = async (req, res) => {
    try {

        const purchasedCourse = await courseModel.findOne({ _id: req.body.courseId })
        const coursename = purchasedCourse.course_name;
        const category = purchasedCourse.category;

        const currentDate = new Date();
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();

        const newOrder = new orderModel({
            course_id: req.body.courseId,
            user_id: req.body.userId,
            course_name: coursename,
            category: category,
            status: 'pending',
            month: currentMonthName,
            year: currentYear,
            date: Date.now(),
        });

        placedOrder = await newOrder.save();

        const orderId = newOrder._id;
        var options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "" + orderId,
        };

        instance.orders.create(options, async function (err, order) {
            if (err) {

                console.error('Error creating order:', err);
                return res.status(500).send({ message: 'Failed to create order', success: false });
            }

            //THIS IS FOR storing trainerid in 'trainerIdForNotification' globally to use In the next fn verifyPayment for saving notification with this trainerid-- TO BACKEND NOTF-------------
            const userData = await userModel.findOne({ _id: req.body.userId })
            const courseData = await courseModel.findOne({ _id: req.body.courseId })
            trainerIdForNotification = courseData.trainer_id
            // -----------------------------------------------------------------------------------

            res.status(200).send({ message: 'Pay amount', success: true, data: order });
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send({ message: 'Something went wrong', success: false });
    }
};


const verifyPayment = async (req, res) => {
    try {
        const details = (req.body)
        const crypto = require("crypto");
        let hmac = crypto.createHmac("sha256", process.env.razorpayKey)
        hmac.update(details.payment.razorpay_order_id + '|' + details.payment.razorpay_payment_id)
        hmac = hmac.digest('hex')

        if (hmac == details.payment.razorpay_signature) {
            await orderModel.findByIdAndUpdate({ _id: details.order.receipt }, { $set: { status: "placed" } });
            await orderModel.findByIdAndUpdate({ _id: details.order.receipt }, { $set: { paymentId: details.payment.razorpay_payment_id } });

             // notification adding to user----------------------------
             const userId = req.body.userId
             const notificationsAlreadyUser = await userNotificationModel.findOne({ user_id: userId })
             if (notificationsAlreadyUser) {
                 await userNotificationModel.updateOne({ user_id: userId, },
                     {
                         $push:
                         {
                             notifications:
                             {
                                 name: `Your booking for the course ${placedOrder.course_name} has been confirmed, and the first day of training is set for ${placedOrder.month} 1 at 6 AM, You will get notifications prior to that`,
                                 booking_id: details.payment.razorpay_payment_id,
                                 timestamp: new Date(),
                             }
                         }
 
                     }
                 )
             }
             else {
                 const bookingNotification = new userNotificationModel({
                    user_id: userId,
                     notifications: [
                         {
                            name: `Your booking for the course ${placedOrder.course_name} has been confirmed, and the first day of training is set for ${placedOrder.month} 1 at 6 AM, You will get notifications prior to that`,
                             booking_id: details.payment.razorpay_payment_id,
                             timestamp: new Date(),
                         }
                     ]
                 })
                 await bookingNotification.save()
             }
             const allNotificaionsUser = await userNotificationModel.findOne({ user_id: userId })
             const notificationDataUser = allNotificaionsUser.notifications.filter(notiy => notiy.status === true)
             // ------------------------------------------------------------------------

            // notification adding to trainer----------------------------
            const trainerId = trainerIdForNotification
            const userData = await userModel.findOne({ _id: req.body.userId })
            const notificationsAlready = await trainerNotificationModel.findOne({ trainer_id: trainerId })
            if (notificationsAlready) {
                await trainerNotificationModel.updateOne({ trainer_id: trainerId, },
                    {
                        $push:
                        {
                            notifications:
                            {
                                name: `${userData.name} have a booking`,
                                booking_id: details.payment.razorpay_payment_id,
                                timestamp: new Date(),
                            }
                        }

                    }
                )
            }
            else {
                const bookingNotification = new trainerNotificationModel({
                    trainer_id: trainerId,
                    notifications: [
                        {
                            name: `${userData.name} have a booking`,
                            booking_id: details.payment.razorpay_payment_id,
                            timestamp: new Date(),
                        }
                    ]
                })
                await bookingNotification.save()
            }
            const allNotificaions = await trainerNotificationModel.findOne({ trainer_id: trainerId })
            const notificationData = allNotificaions.notifications.filter(notiy => notiy.status === true)
            // ------------------------------------------------------------------------
            return res.status(200).send({ message: 'payment success full', success: true, countTrainer: notificationData.length, roomTrainer: trainerId, countUser: notificationDataUser.length, roomUser: userId })
        } else {
            res.status(200).send({ message: 'payment fail', success: false })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'somthin went wrong', success: false })
    }
}



const purchaseList = async (req, res) => {
    try {
        const orderList = await orderModel.find({
            user_id: req.body.userId,
            status: 'placed'
        })
            .sort({ createdAt: -1 });

        if (!orderList) {
            return res.status(200).send({ message: 'No orders exist', success: false })
        }
        res.status(200).send({ message: 'orders Fetched successfully', success: true, data: orderList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}

const cancelpurchase = async (req, res) => {
    try {
        const orderId = req.body.orderId
        await orderModel.deleteOne({ _id: orderId })
        const newOrderList = await orderModel.find({
            user_id: req.body.userId,
            status: 'placed'
        })
            .sort({ createdAt: -1 });
        res.status(200).send({ message: 'order cancelled successfully', success: true, data: newOrderList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}

const averageRating = async (courseId) => {
    const averages = await ratingModel.aggregate([
        { $match: { course_id: courseId } },
        { $unwind: '$reviews' },
        {
            $group: {
                _id: null,
                average: { $avg: '$reviews.starRating' }
            }
        }
    ]);
    const { average } = averages[0];
    const avaregeString = average.toFixed(2);
    const averageFloat = parseFloat(avaregeString);
    await ratingModel.updateOne({ course_id: courseId }, { $set: { average: averageFloat } })
    await courseModel.updateOne({ _id: courseId }, { $set: { averageRating: averageFloat } })
}

const writeReview = async (req, res) => {
    try {
        const courseId = req.body.courseId
        const userData = await userModel.findOne({ _id: req.body.userId })
        const ratingData = await ratingModel.findOne({ course_id: courseId })
        if (courseId) {
            if (!ratingData) {
                const newRating = new ratingModel({
                    course_id: courseId,
                    reviews: [
                        {
                            userName: userData.name,
                            userEmail: userData.email,
                            title: req.body.title,
                            starRating: req.body.rating,
                            review: req.body.comment,
                            userImage: userData.image,
                            timestamp: new Date(),
                        }
                    ]
                })
                await newRating.save()

            } else {
                await ratingModel.updateOne({ course_id: courseId },
                    {
                        $push:
                        {
                            reviews:
                            {
                                userName: userData.name,
                                userEmail: userData.email,
                                title: req.body.title,
                                starRating: req.body.rating,
                                review: req.body.comment,
                                userImage: userData.image,
                                timestamp: new Date(),
                            }
                        }
                    }
                )
            }
            await averageRating(courseId)
            return res.status(200).send({ message: 'Review Submitted', success: true })
        }
        res.status(200).send({
            message: 'fail please try again', success: false
        })
    } catch (error) {
        console.error('Error in writeReview:', error);
        res.status(500).send({ message: 'somthing went wrongzz ', success: false })
    }
}


const getReviews = async (req, res) => {
    try {
        const courseId = req.query.courseId
        const reviewData = await ratingModel.findOne({ course_id: courseId })
        if (reviewData) {
            return res.status(200).send({ message: 'Reviews fetched', success: true, data: reviewData })
        }
        else {
            return res.status(200).send({ message: 'No reviews for this course', success: false })
        }
    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'somthing went wrongzz ', success: false })
    }
}

const notificationCount = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userNotifications = await userNotificationModel.findOne({ user_id: userId });

        if (userNotifications) {
            const notificationData = userNotifications.notifications.filter(notiy => notiy.status === true);

            return res.status(200).send({ message: 'notification count', success: true, data: notificationData.length });
        } else {
            return res.status(200).send({ message: 'trainer not found or no notifications', success: false });
        }
    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'something went wrong', success: false });
    }
}

const getNotifications = async (req, res) => {
    try {
      const userId = req.body.userId;
      const userNotifications = await userNotificationModel.aggregate([
        {
          $match: {
            user_id: userId,
            'notifications.status': true,
          },
        },
        {
          $unwind: '$notifications',
        },
        {
          $match: {
            'notifications.status': true,
          },
        },
        {
          $sort: {
            'notifications.timestamp': -1, 
          },
        },
      ]);
  
      if (userNotifications.length > 0) {
        return res.status(200).send({ message: 'notification count', success: true, data: userNotifications });
      } else {
        return res.status(200).send({ message: 'user not found or no notifications', success: false });
      }
    } catch (error) {
      console.log('Error in backend of fetching reviews', error);
      res.status(500).send({ message: 'something went wrong', success: false });
    }
  };
  
  

const updateNotificationStatus = async (req, res) => {
    try {

        const notificationId = req.query.notificationId;
        await userNotificationModel.updateOne(
            {
                'notifications._id': notificationId
            },
            {
                $set: {
                    'notifications.$.status': false
                }
            }
        );
        return res.status(200).send({ message: 'trainer not found or no notifications', success: true });
       
    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'something went wrong', success: false });
    }
}

module.exports = {
    registerUser,
    loginUser,
    authorization,
    verifyOtp,
    forgotPassword,
    resetPassword,
    editProfile,
    categoryList,
    coursesList,
    placeOrder,
    verifyPayment,
    purchaseList,
    selectedCoursesList,
    cancelpurchase,
    googleLogin,
    writeReview,
    getReviews,
    notificationCount,
    updateNotificationStatus,
    getNotifications


}


