const { User, UserCred, UserSession } = require("../../models/user");
const bcrypt = require('bcrypt');
const { generateToken } = require("../../shared/auth/jwt.authentication");
const saltRounds = 10;

async function registerUser(user) {

    const { name, email, password, phone } = user;

    const exist = await User.findOne({ $or: [{ email }, { phone }] });
    if (exist) {
        return false;
    }

    const newUser = new User({ name, email, phone });
    const mongoUser = await newUser.save();

    const newUserCred = new UserCred({ userId: mongoUser._id, password });

    const hash = await bcrypt.hash(password, saltRounds);
    newUserCred.password = hash;
    const mongoUserCred = await newUserCred.save();

    if (mongoUser && mongoUserCred) {
        return true;
    } else {
        return false;
    }

}

async function loginUser(user) {

    const { email, password } = user;
    console.log('Email inside Login function', email);
    console.log('Password inside Login function', password);

    const mongoUser = await User.findOne({ email });
    const mongoUserCred = await User.findOne({ userId: mongoUser._id });

    const match = await bcrypt.compare(password, mongoUserCred.password);
    if (!match || !mongoUser || !mongoUserCred) {
        return false;
    }

    const token = generateToken({ mongoUser });

    const newUserSession = new UserSession({ userId: mongoUser._id, token });
    const mongoUserSession = await newUserSession.save();

    if (mongoUserSession) {
        return token;
    } else {
        return false;
    }

}

async function logoutUser(user) {

    const { email } = user;
    console.log('Email inside Logout function', email);

    const mongoUser = await User.findOne({ email });
    const mongoUserSession = await UserSession.findOne({ userId: mongoUser._id });
    const updateSession = await UserSession.updateOne({ userId: mongoUser._id }, { token: null });

    if (updateSession) {
        return true;
    } else {
        return false;
    }

}

async function checkAuth(token) {

    const mongoUserSession = await UserSession
        .findOne({ token })
        .populate('userId');

    if (mongoUserSession) {
        return true;
    }

    return false;

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};