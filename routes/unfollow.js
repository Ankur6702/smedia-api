const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')

router.post('/:id', fetchUser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select('-password');
        const userToUnfollow = await User.findById(req.params.id).select('-password');
        if (!userToUnfollow) {
            return res.json({ status: 'error', message: 'User not found' });
        }
        if(userId === userToUnfollow.id) {
            return res.json({ status: 'error', message: 'You cannot unfollow yourself' });
        }
        if (!user.following.includes(userToUnfollow._id)) {
            return res.json({ status: 'error', message: 'Not following' });
        }
        user.following.pull(userToUnfollow._id);
        user.save();
        userToUnfollow.followers.pull(user.id);
        userToUnfollow.save();
        res.json({ status: 'success', message: 'User unfollowed'});
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

module.exports = router