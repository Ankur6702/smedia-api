const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('user', UserSchema);