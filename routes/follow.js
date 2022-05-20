const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')

router.post('/:id', fetchUser, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select('-password');
        const userToFollow = await User.findById(req.params.id).select('-password');
        if (!userToFollow) {
            return res.json({ status: 'error', message: 'User not found' });
        }
        if(userId === userToFollow.id) {
            return res.json({ status: 'error', message: 'You cannot follow yourself' });
        }
        if (user.following.includes(userToFollow._id)) {
            return res.json({ status: 'error', message: 'Already following' });
        }
        user.following.push(userToFollow.id);
        user.save();
        userToFollow.followers.push(user.id);
        userToFollow.save();
        res.json({ status: 'success', message: 'User followed'});
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

module.exports = router