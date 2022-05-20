const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
    unlikes: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
    comments: [{
        id: { type: Schema.Types.ObjectId, ref: 'comment' },
        comment: String,
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        date: { type: Date, default: Date.now },
        post: { type: Schema.Types.ObjectId, ref: 'post' },
    }]
});

module.exports = mongoose.model('post', PostSchema);
