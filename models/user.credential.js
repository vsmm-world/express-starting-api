const mongoose = require('mongoose');

const userCredSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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

const UserCred = mongoose.model('UserCred', userCredSchema);

module.exports = {
    UserCred
};