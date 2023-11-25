const mongoose = require('mongoose')
const notificationSchema = mongoose.Schema({
    trainer_id: {
        type: String,
        ref: 'trainer',
        required: true
    },
    notifications: [{
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        booking_id: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    }]
}, {
    timestamps: true
})
const trainerNotificationModel = mongoose.model('notification', notificationSchema)
module.exports = trainerNotificationModel
