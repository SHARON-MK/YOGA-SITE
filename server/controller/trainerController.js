
const bycrpt = require('bcryptjs')
const trainerModel = require('../models/trainerModel')
const categoryModel = require('../models/categoryModel')
const courseModel = require('../models/courseModel')
const OrderModel = require('../models/orderModel')
const trainerNotificationModel = require('../models/notificationTrainer')
const userNotificationModel = require('../models/notificationUser')
const ratingModel = require('../models/ratingModel')
const jwt = require('jsonwebtoken')
const encryptPassword = require('../config/passwordEncrypting')
const { sendVerifymail, sendForgetPasswordMail_trainer } = require('../config/nodeMailer')
const randomstring = require('randomstring')
const sharp = require('sharp')
const path = require('path');


const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const register = async (req, res) => {
    try {
        console.log('in controller')
        console.log('File Object:', req.file);
        console.log(req.body)

        // trim part- if the obj passed id undefined or empty trim cant perform and throw error to frontend directly - so check firts
        if ((!req.body.name || req.body.name.trim().length === 0) || (!req.body.email || req.body.email.trim().length === 0) || (!req.body.password || req.body.password.trim().length === 0) || (!req.body.confirmpassword || req.body.confirmpassword.trim().length === 0)) {
            return res.status(200).send({ message: "All fields should be filled", success: false });
        }
        console.log('in controller 2')
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
            const userExists = await trainerModel.findOne({ email: req.body.email })
            if (userExists) {
                return res.status(200).send({ message: 'Email already used', success: false })
            }
        } else {
            return res.status(200).send({ message: "Invalid email format", success: false });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.status(200).send({ message: "Password should contain Lowercase letter, Uppercase letter, Digit, Special character, and be at least 6 characters long.", success: false });
        }
        else if (req.body.password != req.body.confirmpassword) {
            return res.status(200).send({ message: "Passwords doesnt match", success: false });
        }

        const hashedPassword = await encryptPassword(req.body.password)
        req.body.password = hashedPassword


        const image = req.file.filename;
        const imagePath = path.join(__dirname, "../uploads/trainerImages/", image);
        // const resizedImagePath = path.join(__dirname, "../uploads/trainerImagesResized/", image);

        // Resize image using sharp
        // await sharp(imagePath)
        //     .resize(500, 500)
        //     .toFile(resizedImagePath);

        const data = await cloudinary.uploader.upload(imagePath);
        req.body.idcard = data.secure_url;



        const newTrainer = new trainerModel(req.body)
        const trainerData = await newTrainer.save()

        if (trainerData) {
            const otpGenarated = Math.floor(1000 + Math.random() * 9999);
            sendVerifymail(req.body.name, req.body.email, otpGenarated);
            await trainerModel.updateOne({ email: req.body.email }, { $set: { otp: otpGenarated } })
        }
        res.status(201).send({ message: 'Your account has been created, verify mail', success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error creating the user', success: false, "error": "Internal server error. Please try again later." })
    }
}

const verifyOtp = async (req, res) => {
    try {
        if (!req.body.otp) { return res.status(200).send({ message: 'Must enter the OTP', success: false }) }

        const otpEntered = req.body.otp.trim()
        const trainerVerified = await trainerModel.findOne({ otp: otpEntered })
        if (trainerVerified) {
            await trainerModel.updateOne({ otp: otpEntered }, { $set: { email_verification: true } })
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

const login = async (req, res) => {
    try {
        const trainer = await trainerModel.findOne({ email: req.body.email })
        if (!trainer) {
            return res.status(200).send({ message: 'Trainer does not exist', success: false })
        }

        const email_verification = trainer.email_verification
        if (!email_verification) {
            return res.status(200).send({ message: 'Please verify your email', success: false })
        }

        const admin_verification = trainer.admin_verification
        if (!admin_verification) {
            return res.status(200).send({ message: 'Admin has to verify your account', success: false })
        }

        const passMatch = await bycrpt.compare(req.body.password, trainer.password)
        if (!passMatch) {
            return res.status(200).send({ message: 'Password is incorrect', success: false })
        } else {
            const token = jwt.sign({ id: trainer._id, role: "TRAINER" }, process.env.JWT_SECRET_TRAINER, { expiresIn: '1d' })
            res.status(200).send({ message: 'Login successfull', success: true, data: token })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error Logging in', success: false, "error": "Internal server error. Please try again later." })

    }
}

const googleLogin = async (req, res) => {
    try {
        const trainer = await trainerModel.findOne({ email: req.body.email })

        if (trainer) {
            const email_verification = trainer.email_verification
            if (!email_verification) {
                return res.status(200).send({ message: 'Please verify your email', success: false })
            }

            const token = jwt.sign({ id: trainer._id, role: "TRAINER" }, process.env.JWT_SECRET_TRAINER, { expiresIn: '1d' })
            res.status(200).send({ message: 'Login successfull', success: true, data: token })
        }
        else {

            const newTrainer = new trainerModel({
                name: req.body.name,
                email: req.body.email,
                password: 123456,
                email_verification: true
            });
            const trainerData = await newTrainer.save();
            if (trainerData) {
                const token = jwt.sign({ id: newTrainer._id, role: "TRAINER" }, process.env.JWT_SECRET_TRAINER, { expiresIn: '1d' })
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
        const trainer = await trainerModel.findOne({ _id: req.body.trainerId })
        if (!trainer) {
            return res.status(200).send({ message: "trainer does not exist", success: false })
        } else {
            return res.status(200).send({ success: true, data: trainer })
        }
    } catch (error) {
        return res.status(500).send({ message: "Error getting trainer info", success: false, error })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const trainerData = await trainerModel.findOne({ email: req.body.email })
        if (!trainerData) {
            return res.status(200).send({ message: 'No account is linked with this email ID', success: false })
        }
        const token = randomstring.generate()
        await trainerModel.updateOne({ email: req.body.email }, { $set: { token: token } })
        sendForgetPasswordMail_trainer(trainerData.name, trainerData.email, token)
        res.status(200).send({ message: 'Click on the link sent to your mail to reset password', success: true })
    } catch (error) {
        res.status(500).send({ message: "Error in forgot password", success: false, error })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, cpassword, token } = req.body;
        const trainerData = await trainerModel.findOne({ token: token })
        if (!trainerData) {
            return res.status(500).send({ message: 'Wrong link', success: false })
        }
        if (password && cpassword && password.trim() && cpassword.trim() && password === cpassword) {
            const hashedPassword = await encryptPassword(password)
            await trainerModel.updateOne({ token: token }, { password: hashedPassword })
            res.status(200).send({ message: 'New password created', success: true })
        }
        else {
            res.status(200).send({ message: 'Password does not match', success: false })
        }
    } catch (error) {
        res.status(500).send({ message: "Error in reset password", success: false, error })
    }
}

const categoryList = async (req, res) => {
    try {
        const categoryList = await categoryModel.find()
        if (!categoryList) {
            return res.status(200).send({ message: 'No courses exist', success: false })
        }
        res.status(200).send({ message: 'Category Fetched successfully', success: true, data: categoryList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}

const courseRegistration = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(200).send({ message: 'No image uploaded', success: 'image' })
        }

        const image = req.file.filename;
        const imagePath = path.join(__dirname, "../uploads/courseImages/", image);
        const resizedImagePath = path.join(__dirname, "../uploads/corseImagesResized/", image);

        // Resize image using sharp
        await sharp(imagePath)
            .resize(500, 500)
            .toFile(resizedImagePath);

        const data = await cloudinary.uploader.upload(resizedImagePath);
        const imageURL = data.secure_url;

        const trainerData = await trainerModel.findOne({ _id: req.body.trainerId })
        const categoryData = await categoryModel.findOne({ name: req.body.category })

        const course = new courseModel({
            trainer_id: req.body.trainerId,
            trainer_name: trainerData.name,
            category_id: categoryData._id,
            category: req.body.category,
            course_name: req.body.course_name,
            time: req.body.time,
            amount: req.body.amount,
            description: req.body.description,
            image: imageURL
        })
        await course.save();

        res.status(200).send({ message: 'successfulll', success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'somthing wddddent wrong', success: false, error })
    }
}

const editProfile = async (req, res) => {
    try {
        const id = req.body.trainerId
        console.log('id', req.body.trainerId)
        const name = req.body.name
        const age = req.body.age
        const city = req.body.city
        const country = req.body.country
        if (name !== "") {
            await trainerModel.findOneAndUpdate(
                { _id: id },
                { $set: { name: name } }
            );
        }
        if (age !== 0) {
            console.log('yes')
            await trainerModel.findOneAndUpdate(
                { _id: id },
                { $set: { age: age } }
            );
        }
        if (city !== '') {
            await trainerModel.findOneAndUpdate(
                { _id: id },
                { $set: { city: city } }
            );
        }
        if (country !== '') {
            await trainerModel.findOneAndUpdate(
                { _id: id },
                { $set: { country: country } }
            );
        }

        if (req.file) {
            const image = req.file.filename;
            const imagePath = path.join(__dirname, "../uploads/trainerImages/", image);
            const resizedImagePath = path.join(__dirname, "../uploads/trainerImagesResized/", image);

            // Resize image using sharp
            await sharp(imagePath)
                .resize(500, 500)
                .toFile(resizedImagePath);

            const data = await cloudinary.uploader.upload(resizedImagePath);
            const imageURL = data.secure_url;

            await trainerModel.findOneAndUpdate(
                { _id: id },
                { $set: { image: imageURL } }
            );

        }

        res.status(200).send({ message: 'User Profile updated', success: true })
    } catch (error) {
        res.status(500).send({ message: "Error in editing profile", success: false, error })
    }
}

const listServices = async (req, res) => {
    try {
        const trainerId = req.body.trainerId
        const courseList = await courseModel.find({ trainer_id: trainerId })
        if (!courseList) {
            return res.status(200).send({ message: 'No courses exist', success: false })
        }
        res.status(200).send({ message: 'courses Fetched successfully', success: true, data: courseList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
    }
}

const courseEdit = async (req, res) => {
    try {
        if (req.file) {
            const image = req.file.filename;
            const imagePath = path.join(__dirname, "../uploads/courseImages/", image);
            const resizedImagePath = path.join(__dirname, "../uploads/corseImagesResized/", image);

            await sharp(imagePath)
                .resize(500, 500)
                .toFile(resizedImagePath);

            const data = await cloudinary.uploader.upload(resizedImagePath);
            const imageURL = data.secure_url;

            await courseModel.updateOne({ _id: req.body.courseId }, { $set: { image: imageURL } });
        }

        await courseModel.updateOne(
            { _id: req.body.courseId },
            {
                $set: {
                    course_name: req.body.course_name,
                    category: req.body.category,
                    amount: req.body.amount,
                    time: req.body.time,
                    description: req.body.description,
                }
            }
        );

        res.status(200).send({ message: 'successfulll', success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'somthing wddddent wrong', success: false, error })
    }
}

const courseDeletion = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        await courseModel.deleteOne({ _id: courseId });
        const newCouresList = await courseModel.find()

        return res.status(200).send({ message: 'course deleted', success: true, data: newCouresList })

    } catch (error) {
        res.status(500).send({ message: 'somthing went wrong', success: false, error })
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
        const trainerId = req.body.trainerId;
        const trainerNotifications = await trainerNotificationModel.findOne({ trainer_id: trainerId });

        if (trainerNotifications) {
            const notificationData = trainerNotifications.notifications.filter(notiy => notiy.status === true);

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
        const trainerId = req.body.trainerId;
        const trainerNotifications = await trainerNotificationModel.aggregate([
            {
                $match: {
                    trainer_id: trainerId,
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

        if (trainerNotifications.length > 0) {
            return res.status(200).send({ message: 'notification count', success: true, data: trainerNotifications });
        } else {
            return res.status(200).send({ message: 'trainer not found or no notifications', success: false });
        }
    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'something went wrong', success: false });
    }
};


const updateNotificationStatus = async (req, res) => {
    try {

        const notificationId = req.query.notificationId;
        await trainerNotificationModel.updateOne(
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

const getClassDetails = async (req, res) => {
    try {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const monthName = currentDate.toLocaleString('default', { month: 'long' });
        const currentMonthAndYear = `${monthName}/${currentYear}`;


        return res.status(200).send({ message: 'trainer not found or no notifications', success: true, month: currentMonthAndYear });

    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'something went wrong', success: false });
    }
}


const getAllUsersForNotification = async (req, res) => {
    try {

        const courseId = req.query.courseId
        const roomId = req.query.roomId

        const currentDate = new Date();
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();

        const orders = await OrderModel.find({
            course_id: courseId,
            year: currentYear.toString(),
            month: currentMonthName,
        });

        const userIds = orders.map(order => order.user_id);
        console.log('sharon', userIds)
       
        // notification adding to user----------------------------
        
        if (Array.isArray(userIds)) {
            // If userIds is an array
            for (const userId of userIds) {
                
                const notificationsAlreadyUser = await userNotificationModel.findOne({ user_id: userId });
                if (notificationsAlreadyUser) {
                    await userNotificationModel.updateOne(
                        { user_id: userId },
                        {
                            $push: {
                                notifications: {
                                    name: `Your class has been started, CLICK HERE TO JOIN or Go to classes and enter the room Code ${roomId}`,
                                    timestamp: new Date(),
                                    room: roomId
                                },
                            },
                        }
                    );
                } else {
                    const classRoomNotification = new userNotificationModel({
                        user_id: userId,
                        notifications: [
                            {
                                name: `Your class has been started, CLICK HERE TO JOIN or Go to classes and enter the room Code ${roomId}`,

                                timestamp: new Date(),
                                room: roomId
                            },
                        ],
                    });
                    await classRoomNotification.save();
                }
            }
        } else {
            // If userIds is not an array (assuming it's a single user ID)
            const userId = userIds;
        
            const notificationsAlreadyUser = await userNotificationModel.findOne({ user_id: userId });
            if (notificationsAlreadyUser) {
                await userNotificationModel.updateOne(
                    { user_id: userId },
                    {
                        $push: {
                            notifications: {
                                name: `Your class has been started, CLICK HERE TO JOIN or Go to classes and enter the room Code ${roomId}`,
                                timestamp: new Date(),
                                room: roomId
                            },
                        },
                    }
                );
            } else {
                const bookingNotification = new userNotificationModel({
                    user_id: userId,
                    notifications: [
                        {
                            name: `Your class has been started, CLICK HERE TO JOIN or Go to classes and enter the room Code ${roomId}`,
                            timestamp: new Date(),
                            room: roomId
                        },
                    ],
                });
                await bookingNotification.save();
            }
        }
        // const allNotificaionsUser = await userNotificationModel.findOne({ user_id: userIds })
        // const notificationDataUser = allNotificaionsUser.notifications.filter(notiy => notiy.status === true)
        // ------------------------------------------------------------------------

        return res.status(200).send({ message: 'all users data', success: true, data:userIds});

    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'something went wrong', success: false });
    }
}

const getTrainerName = async (req, res) => {
    try {

        const trainerId = req.body.trainerId
        const trainerData = await trainerModel.findOne({_id:trainerId})
        const trainerName = trainerData.name
        return res.status(200).send({ message: 'trainer name fetched', success: true, data:trainerName });
       
    } catch (error) {
        console.log('Error in backend of fetching reviews', error);
        res.status(500).send({ message: 'something went wrong', success: false });
    }
}

module.exports = {
    register,
    login,
    verifyOtp,
    forgotPassword,
    resetPassword,
    authorization,
    courseRegistration,
    categoryList,
    editProfile,
    listServices,
    courseEdit,
    courseDeletion,
    googleLogin,
    getReviews,
    notificationCount,
    getNotifications,
    updateNotificationStatus,
    getClassDetails,
    getAllUsersForNotification,
    getTrainerName
}