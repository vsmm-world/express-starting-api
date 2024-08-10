const mongoose = require('mongoose');


const userSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = {
    UserSession
};