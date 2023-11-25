const nodemailer = require("nodemailer");
const userModel = require('../models/userModel')

const sendVerifymail = async (name, userEmail, otp) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOption = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "For OTP verification",
        html:
          "<p>Hai " +
          name +
          ',please use this OTP -  ' +
          otp +
          "  for your account verification in PURE ATHMA " +
          "</p>",
      };
  
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log("emai has been send to:", info.response);
        }
      });
         } catch (error) {
      console.log(error.message);
    }
  };


  sendForgetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'For mail verification',
            html: `Hi ${name}, <a href="http://localhost:3000/resetPassword?token=${token}"> Click here </a> to reset your password`

        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Mail has been sent succesfully', info.response)
            }

        })
    } catch (error) {
        console.log(error.message);
    }
}

sendForgetPasswordMail_trainer = async (name, email, token) => {
  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
          }
      })

      const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'For mail verification',
          html: `Hi ${name}, <a href="http://localhost:3000/trainer/resetPassword?token=${token}"> Click here </a> to reset your password`

      }
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error)
          } else {
              console.log('Mail has been sent succesfully', info.response)
          }

      })
  } catch (error) {
      console.log(error.message);
  }
}

  module.exports = {
    sendVerifymail,
    sendForgetPasswordMail,
    sendForgetPasswordMail_trainer
  }