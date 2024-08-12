const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
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


const userSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    otpRef: {
        type: String,
        required: false
    },
    expiredAt: {
        type: Date,
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

const UserSession = mongoose.model('UserSession', userSessionSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    UserSession,
    UserCred
};