const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const fetchUser = require('../middleware/fetchUser')

router.post('/:id', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if(!user) {
            return res.json({ status: 'error', message: 'User not found' });
        }
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.json({ status: 'error', message: 'Post not found' });
        }
        if(post.unlikes.includes(userId)) {
            return res.json({ status: 'error', message: 'You already unliked this post' });
        }
        if(post.likes.includes(userId)) {
            // Someone cannot like and unlike the post at the same time
            post.likes.pull(userId);
        }
        post.unlikes.push(userId);
        await post.save();

        res.json({ status: 'success', message: 'Post Unliked'});
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

module.exports = router