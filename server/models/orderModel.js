const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    course_id:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    course_name:{
        type: String,
        required: false
    },
    category:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required:true
    },
    paymentId:{
        type: String,
        required:false
    },
    month:{
        type: String,
        required:true
    },
    year:{
        type: String,
        required:true
    },
    date: { type: Date }
},
{
    timestamps:true
})

const OrderModel = new mongoose.model('orders',orderSchema)

module.exports = OrderModel