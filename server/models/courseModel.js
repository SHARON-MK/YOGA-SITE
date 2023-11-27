const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    trainer_id: {
        type: String,
        ref: 'trainer',
        required: true
    },
    trainer_name: {
        type: String,
        ref: 'trainer',
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        required: false
    }
   
})

const Coursemodel = new mongoose.model('courses',courseSchema)

module.exports = Coursemodel