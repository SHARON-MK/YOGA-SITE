const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
   
})

const Categorymodel = new mongoose.model('categories',categorySchema)

module.exports = Categorymodel