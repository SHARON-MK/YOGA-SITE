const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    history: [
        {
            sender_name: {
                type: String
            },
            sender_id: {
                type: String,
                required: true
            },
            chat: {
                type: String
            },
            time: {
                type: Date
            }
        }
    ]
},
    {
        timestamps: true,
    }
);

const chatModel = mongoose.model('chatHistory', chatSchema)
module.exports = chatModel
