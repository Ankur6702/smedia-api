const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')

router.get('/', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if(!user) {
            return res.json({ status: 'error', message: 'User not found' })
        }
        totalFollowers = user.followers.length;
        totalFollowing = user.following.length;
        const newUser = {
            id: user.id,
            username: user.name,
            numberOfFollowers: totalFollowers,
            numberOfFollowing: totalFollowing,
        }
        res.json({ status: 'success', message: 'User found', user: newUser });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

module.exports = router