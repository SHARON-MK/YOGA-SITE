const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    admin:{
        type: Boolean,
        default: false
    },
    otp:{
        type: Number
    },
    email_verification:{
        type: Boolean,
        default: false
    },
    token:{
        type: String,
        default:''
    },
    blocked:{
        type: Boolean,
        default: false
    },
    image:{
        type:String,
        default: 'https://res.cloudinary.com/dqn0v17b6/image/upload/v1691727669/routcpczust6tlyknhyy.jpg'
    },
    age:{
        type: Number,
        required:false
    },
    city:{
        type: String,
        required:false
    },
    country:{
        type: String,
        required:false
    }
},
{
    timestamps:true
})

const userModel = new mongoose.model('users',userSchema)

module.exports = userModel