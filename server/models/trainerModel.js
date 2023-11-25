const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
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
    otp:{
        type: Number
    },
    email_verification:{
        type: Boolean,
        default: false
    }, 
    admin_verification:{
        type: Boolean,
        default: false
    },
    token:{
        type: String,
        default:''
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
    }, 
    image:{
        type:String,
        required:false
    },
    idcard:{
        type:String,
        required:false
    },
    
},
{
    timestamps:true
})

const TrainerModel = new mongoose.model('trainers',trainerSchema)

module.exports = TrainerModel